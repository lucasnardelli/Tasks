import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import TaskList from './screens/TaskList'
import Home from './Drawer'
import Auth from './screens/Auth'

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: Home
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Auth'
})

export default createAppContainer(mainNavigator)