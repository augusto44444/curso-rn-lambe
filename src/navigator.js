import React from 'react';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feed from './screns/Feed';
import AddPhoto from './screns/AddPhoto'
import Profile from './screns/Profile'
import Login from './screns/Login'
import Register from './screns/Registar'
import Splash from './screns/splash'


const authRouter = createStackNavigator({
    Login: { screen: Login, navigationOptions: { title: 'Login' } },
    Register: { screen: Register, navigationOptions: { title: 'Registrar' } },
}, {
    initialRouteName: 'Login'
})


const LoginOrProfileRouter = createSwitchNavigator({
    Profile: Profile,
    Auth: authRouter
}, {
        initialRouteName: 'Auth'
    })

const MenuRoutes = {
    Feed: {
        name: 'Feed',
        screen: Feed,
        navigationOptions: {
            title: 'Feed',
            tabBarIcon: ({ tintColor }) => <Icon name='home' size={30} color={tintColor} />
        }
    },
    Add: {
        name: 'Add photo',
        screen: AddPhoto,
        navigationOptions: {
            title: 'Adicionar foto',
            tabBarIcon: ({ tintColor }) => <Icon name='camera' size={30} color={tintColor} />
        }
    },
    Profile: {
        name: 'Profile',
        screen: LoginOrProfileRouter,
        navigationOptions: {
            title: 'Profile',
            tabBarIcon: ({ tintColor }) => <Icon name='user' size={30} color={tintColor} />
        }
    }
}

const MenuConfig = {
    initialRouteName: 'Feed',
    tabBarOptions: {
        showLabel: true,
    }
}

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig)

const splashRouter = createSwitchNavigator({
    Splash: Splash,
    App: MenuNavigator
}, {
    initialRouteName: 'Splash'
})


export default splashRouter;