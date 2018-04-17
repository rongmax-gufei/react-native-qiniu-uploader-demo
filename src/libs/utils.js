import {Platform, Linking, Alert} from 'react-native'
import Permissions from 'react-native-permissions'
import {Modal} from 'antd-mobile'
import {Dimensions} from "react-native"

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
}

export const getKeyForObj = (obj) => {
    let keyName
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            keyName = key
            // console.log('key', key)
        }
    }
    return keyName
}

export const compressImage = (url, width, height) => {
    return url + '?imageView2/1/w/'+width+'/h/'+height
}

// https://github.com/yonahforst/react-native-permissions

export const requestCamera = (shouldRequestMicrophone, cb) => {
    console.log('正在请求相机权限')
    Permissions.request('camera').then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log('camera', response)
        shouldRequestMicrophone && requestMicrophone(cb)
        !shouldRequestMicrophone && cb && cb()

    })
}

export const requestMicrophone = (cb) => {
    console.log('正在请求麦克风权限')
    Permissions.request('microphone').then(response => {
        // Returns once the user has chosen to 'allow' or to 'not allow' access
        // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        console.log(response, cb)
        cb && cb()

    })
}
const noPermission = {'undetermined': true, 'denied': true, 'restricted': true}

export const checkPermission = (cb) => {

    Permissions.checkMultiple(['camera', 'microphone']).then(response => {
        //response is an object mapping type to permission'
        if (response.camera === 'authorized' && response.microphone === 'authorized') {
            cb()
            return
        }
        if (Platform.OS === 'ios') {
            cb()
            if (response.camera !== 'authorized') {
                Alert.alert('请设置相机权限', '', [
                    { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
                    { text: '设置', onPress: () => Permissions.openSettings() },
                ]);
            }
            if (response.microphone !== 'authorized') {
                Alert.alert('请设置麦克风权限', '', [
                    { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
                    { text: '设置', onPress: () => Permissions.openSettings() },
                ]);
            }
            return
        }
        if(noPermission[response.camera]) {
            requestCamera(noPermission[response.microphone], cb)
            return
        }
        if(noPermission[response.microphone]) requestMicrophone(cb)
    })
}

export const openUrl = (url) => {
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ' + url);
        } else {
            return Linking.openURL(url);
        }
    }).catch(err => console.error('An error occurred', err));
}


// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

// screen
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||
        (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))
    )
}
