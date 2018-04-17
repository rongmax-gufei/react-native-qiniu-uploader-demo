import axios from 'axios'
import {Actions} from 'react-native-router-flux'
// import {RKey} from '../routes'
import api from '../config/api'
import Storage from './storage'
import AppEnv from '../stores/AppEnv'

for (let key in api) {
    api[key] = fetch.bind(null, api[key])
}

export default api

function fetch(urlOptions, options) {
    options = Object.assign({}, urlOptions, options || {})
    return new Promise((resolve, reject) => {
        let config =  {
            timeout: 60000,
            method: 'get',
            credentials: 'same-origin',
            responseType: 'json',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let instance = axios.create(config)

        if(options.headers && options.headers.Authorization) {
            instance.defaults.headers.common['Authorization'] = 'UpToken ' + options.headers.Authorization
            delete options.headers.Authorization
            return doRequest(instance, options, resolve, reject)
        }
        
        Storage.load({key: 'token'}).then(token => {
            if (token) instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
            console.log(token)
            doRequest(instance, options, resolve, reject)
        }).catch((err) => {
            console.log(err)
            doRequest(instance, options, resolve, reject)
        })
        
        
        // instance.interceptors.request.use((config) => {
        //     console.log('interceptors', config)
        //     let token = Storage.load({key: 'token'}).then(token => {
        //         if (token) config.headers.Authorization = 'Bearer ' + token
        //     })
        //     console.log(config)
        //     return config
        // })
    })
}

function doRequest(instance, options, resolve, reject) {
    options.url = switchPath(options.url, options)
    console.log(`%c options for ${options.url}`, 'color: #69bdf5', options)

    instance.request(options).then(response => {
    console.log(`%c response for ${options.url}`, 'color: #69bdf5', response)

    const res = response.data || response
    const {errorCode} = response

    // if (errorCode && errorCode !== 0) {
    //     reject(res)
    // }
        resolve(res)
    }).catch(error => {
        console.log(`error for ${options.url}`, error.response)
        Actions.reset('login')
        reject(error.response)
    })
}

function switchPath(url, options) {
    const {HOST, INFO_SERVER} = AppEnv.address
    console.log('AppEnv.address', AppEnv.address)

    if(options.urlParams) {
        url = replaceParams(url, options.urlParams)
    }
    let regResult = /(\d)\/(.*)/.exec(url)
    let prefix = parseInt(regResult[1])
    let path = regResult[2]

    switch (prefix) {
        case 1: //
            prefix = `${INFO_SERVER}`
            break
        case 6: // 登陆
            prefix = `${HOST}/auth`
            break
        case 7:
            prefix = `${HOST}`
            break
        case 8: // 七牛
            prefix = 'http://upload.qiniu.com'
            break
        default:
            prefix = ''
            break
    }

    return prefix + '/' + path
}

function replaceParams(url, urlParams) {
    let urlReplaceKeys = getMathKeys(url, [])

    for(var i=0; i< urlReplaceKeys.length; i++) {
        let key = urlReplaceKeys[i]

        url = url.replace('{' + key + '}', urlParams[key])
    }

    return url
}

function getMathKeys(url, matchKeys) {
    let reg = /\{(\w+)\}/g
    let urlReplaceKeys = reg.exec(url)
    console.log('urlReplaceKeys', urlReplaceKeys)
    while(urlReplaceKeys) {
        matchKeys.push(urlReplaceKeys[1])
        urlReplaceKeys = reg.exec(url)
    }

    return matchKeys
}