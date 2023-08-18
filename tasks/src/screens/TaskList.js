import React, {Component} from "react"
import { SafeAreaView, Text, ImageBackground, StyleSheet, View } from 'react-native'

import commonStyles from '../commonStyles.js'
import todayImage from '../../assets/imgs/today.jpg'

import moment from 'moment'
import 'moment/locale/pt-br'


export default class TaskList extends Component {
    render (){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')
        return(
            <SafeAreaView style={styles.container}>
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <Text>Tarefa #01</Text>
                    <Text>Tarefa #02</Text>
                    <Text>Tarefa #03</Text>
                </View>
                
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
    }
})