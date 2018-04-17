import React, {Component} from 'react'
import {Platform, BackHandler, ToastAndroid} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {Provider} from 'mobx-react'

import Router, {RKey} from './src/routes'
import stores from './src/stores/index'

import './src/libs/globe'
import './src/libs/utils'

global.__IOS__ = Platform.OS === 'ios'
global.__ANDROID__ = Platform.OS === 'android'

if (!__DEV__) {
    global.console = {
        log: () => {},
        error: () => {},
        warn: () => {},
    }
}

export default class App extends Component {

    componentWillMount() {
        if(__ANDROID__) BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
     
    componentWillUnmount() {
        if(__ANDROID__) BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }

    onBackAndroid = () => {
        let currentRoutes = Actions.state.routes
        let currentRoute = currentRoutes[0].routeName
        let bTopPage = currentRoutes.length <= 1
        let sTargetPage = (currentRoute ===  RKey.LOGIN || currentRoute === RKey.HOME_NAV)
        if(sTargetPage && sTargetPage) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                BackHandler.exitApp()
                return false
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
            return true;
        } else {
            Actions.pop()
            return true;
        }
    }

    render() {
        return (<Provider {...stores}>
                    <Router />
                </Provider>)
    }
}