import 'react-native-gesture-handler';
import React from "react"
import { SafeAreaView, StyleSheet, Text } from "react-native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import TaskList from './screens/TaskList'

const Drawer = createDrawerNavigator();
export default props => (
    
    <NavigationContainer>
        <Drawer.Navigator>
            <Drawer.Screen name="Hoje" component={TaskList}/>
            <Drawer.Screen name="Amanhã" component={TaskList}/>
        </Drawer.Navigator>
    </NavigationContainer>
)