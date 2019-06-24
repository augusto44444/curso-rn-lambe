import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import axios from 'axios'
import React from 'react'
import { Provider } from 'react-redux'
import storeConfig from './src/store/storeConfig'

axios.defaults.baseURL = 'https://cloneinsta-b29e7.firebaseio.com/'

const store = storeConfig()

const Redux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);