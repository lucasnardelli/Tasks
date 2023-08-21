import React, { Component } from "react";
import { ImageBackground, Text, StyleSheet, View, TextInput, TouchableOpacity, Platform, Alert } from "react-native";

import backGroundImage from '../../assets/imgs/login.jpg'
import commonStyles from '../commonStyles'

export default class Auth extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: false
    }

    singinOrSingup = () => {
        if(relativeTimeThreshold.state.stageNew) {
            Alert.alert('sucesso', 'Criar conta')
        } else {
            Alert.alert('sucesso', 'logar')
        }
    }

    render () {
        return (
            <ImageBackground source={backGroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subTitle}>{this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}</Text>
                    {
                        this.state.stageNew &&
                        <TextInput placeholder="Nome" 
                            value={this.state.name} 
                            style={styles.input} 
                            onChangeText={name => this.setState({ name })} />

                    }
                    <TextInput placeholder="E-mail" 
                        value={this.state.email} 
                        style={styles.input} 
                        onChangeText={email => this.setState({ email })} />
                    <TextInput placeholder="Senha" 
                        value={this.state.password} 
                        style={styles.input} 
                        onChangeText={password => this.setState({ password })} 
                        secureTextEntry={true}/>
                    {
                        this.state.stageNew &&
                        <TextInput placeholder="Confirme sua senha" 
                            value={this.state.confirmPassword} 
                            style={styles.input} 
                            onChangeText={confirmPassword => this.setState({ confirmPassword })} 
                            secureTextEntry={true}/>
                    }

                    <TouchableOpacity onPress={this.singinOrSingup}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>{this.state.stageNew ? 'Registrar' : 'Entrar'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>{this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}</Text>
                </TouchableOpacity>
            </ImageBackground>

        )
    }
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%', 
    },
    input: {
        backgroundColor: '#FFF',
        padding: Platform.OS == 'ios' ? 15 : 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})