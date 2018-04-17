import {observable, action} from 'mobx'
import Storage from '../libs/storage'

function regConvertHttp(url) {
    if (!/https/.test(url)) {
        return url && url.replace(/http/i, 'https')
    }
    return url
}

class UserInfo {
    @observable username = ''
    @observable userAvatar = ''
    @observable isTeacher = false
    @observable userId = null
    @observable token = ''
    @observable openId = ''
    @observable liveSign = ''
    @observable roles = ''

    @action
    handelUsername = (name) => {
        this.username = name
        this.saveStorageUser({username: name})
    }

    @action
    handleAvatar = (avatar) => {
        this.userAvatar = avatar
        this.saveStorageUser({userAvatar: avatar})
    }

    @action
    saveUserInfo = (info, callback) => {
        const {access_token, expiresDate, user} = info
        const userInfo = {
            username: user.name,
            userAvatar: user.avatar,
            isTeacher: false,
            liveSign: user.liveSign,
            userId: user.id,
            openId: user.openId,
            mobile: user.mobile,
            expiresDate,
            fromPhoneLogin: user.fromPhoneLogin
        }
        Storage.save({
            key: 'token',
            data: access_token
        }).then(() => {
            callback && callback()
        })

        Storage.save({
            key: 'user',
            data: userInfo
        })
    }

    @action saveStorageUser = (newInfo) => {
        Storage.load({key: 'user'}).then((data) => {
            const newData = Object.assign({}, data || {}, newInfo || {})
            Storage.save({
                key: 'user',
                data: newData
            })

        })
    }

    @action
    setUserInfo = (info, callback) => {
        // const userId = info.user.id
        info.user.avatar = regConvertHttp(info.user.avatar)
        const {access_token, expires_in, user, accessToken} = info
        const expiresDate = expires_in ? expires_in + Date.now() : accessToken.expiresDate
        this.username = user.name
        this.userAvatar = user.avatar
        this.isTeacher = false
        this.userId = user.id
        this.openId = user.openId
        this.mobile = user.mobile
        this.token = access_token || accessToken.tokenStr
        this.expiresDate = expiresDate
        this.liveSign = user.liveSign
        this.roles = user.roles
        info.access_token = this.token
        info.expiresDate = this.expiresDate
        console.log('user info ', this.roles)
        this.saveUserInfo(info, callback)
    }

    @action
    logout = (callback) => {
        Storage.remove({key: 'user'})
        Storage.remove({key: 'token'})
        this.isTeacher = false
        this.token = ''

        callback()
    }

    @action
    getUploadToken = (options, successCallback) => {
        global.api.getUploadToken(options).then((data) => {
            console.log(data)
            successCallback(data)
        })
    }

    @action
    uploadImage = (options, successCallback) => {
        global.api.uploadImage(options).then((data) => {
            successCallback(data)
        })
    }

    @action
    setTeacherInfo = (info, callback) => {
        info.user.avatar = info.user.avatar && regConvertHttp(info.user.avatar)
        const {access_token, user} = info
        this.username = user.name
        this.userAvatar = user.avatar
        this.isTeacher = true
        this.userId = user.id
        this.mobile = user.mobile
        this.token = access_token
        this.liveSign = user.liveSign
        this.roles = user.roles
        this.saveTeacherInfo(info, callback)
    }

    @action
    saveTeacherInfo = (info, callback) => {
        const {access_token, user} = info
        const userInfo = {
            username: user.name,
            userAvatar: user.avatar,
            isTeacher: true,
            liveSign: user.liveSign,
            userId: user.id,
            mobile: user.mobile,
            account: user.account,
            password: user.password
        }
        Storage.save({
            key: 'token',
            data: access_token
        }).then(() => {
            callback && callback()
        })

        Storage.save({
            key: 'user',
            data: userInfo
        })
    }
}

export default new UserInfo()
