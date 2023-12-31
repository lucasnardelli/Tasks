import React, {Component} from "react"
import { SafeAreaView, Text, ImageBackground, StyleSheet, View, FlatList, TouchableOpacity, Platform, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from '../commonStyles.js'
import todayImage from '../../assets/imgs/today.jpg'

import Icon from 'react-native-vector-icons/FontAwesome.js'
import Task from '../components/Task.js'
import AddTask from "./AddTask.js"
import { server, showError } from "../common.js";

import moment from 'moment'
import 'moment/locale/pt-br'
import axios from "axios";


const initialState = { 
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}

export default class TaskList extends Component {

    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || initialState
        this.setState({showDoneTasks: savedState.showDoneTasks}, this.filterTasks)

        this.loadTasks()
    }

    toggleTask = async taskId => {
        try{
            await axios.put(`${server}/tasks/${taskId}/toggle/`)
            this.loadTasks()
        }catch(e){
            showError(e)
        }
    }

    loadTasks = async () => {
        try{
            const maxDate = moment().format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data }, this.filterTasks)
        }catch (e) {
            showError(e)
        }
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({visibleTasks})
        AsyncStorage.setItem('tasksState', JSON.stringify({showDoneTasks: this.state.showDoneTasks}))
    }

    addTask = async (newTask) => {
        if (!newTask.desc.trim() || !newTask.desc){
            Alert.alert('Dados Inválidos', 'Descrição não informada')
            return 
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.date
            })

            this.setState({showAddTask: false }, this.loadTasks)

        }catch(e){
            showError(e)
        }
    }

    deleteTask = async taskId => {
        try{
            await axios.delete(`${server}/tasks/${taskId}`)
            this.loadTasks()
        }catch (e){
            showError(e)
        }
    }

    render (){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')
        return(
            <SafeAreaView style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} 
                onCancel={() => this.setState({ showAddTask: false })}
                onSave={this.addTask}/>
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.showDoneTasks ? "eye" : 'eye-slash'} size={20} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask}/>} 
                    />

                </View>
                <TouchableOpacity style={styles.addButton}
                    onPress={() => this.setState({ showAddTask: true })}
                    activeOpacity={0.7}>
                    <Icon name="plus" size={20} color={commonStyles.colors.secondary}/>
                </TouchableOpacity>
                
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,        
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 30,  
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center',
    }
})