import {observable, action} from 'mobx'
import StatusStore from './StatusModal'
import {RESPONSE_CODE} from '../config/setting'

class Login {

    @observable username = ''
    @observable password = ''
    @observable userErrorMsg = ''
    @observable pwdErrorMsg = ''

    @action
    setUsername = (username) => {
        this.username = username
    }

    @action 
    setPassword = (password) => {
        this.password = password
    }

    @action
    setUserErrorMsg = (msg) => {
        this.userErrorMsg = msg
    }

    @action
    setPwdErrorMsg = (msg) => {
        this.pwdErrorMsg = msg
    }

    /**
     *
     * @param userData
     * example {username: account, password: password, systemId: 3}
     * @param success callback
     * @param failback fail callback
     */
    @action 
    loginByTeacher = (userData, success, failback) => {

        let options = {method: 'POST', data: userData}

        global.api.loginByTeacher(options).then(resp => {
            console.log('teacher login ...', resp)

            let data = resp.data

            // LOGIN TO AIR
            if(resp.code === RESPONSE_CODE.SUCCESS){
                success(resp)
                // Socket.init()
            }
            else {
                failback(resp)
            }
        }).catch( e => {
            console.log(e)
            StatusStore.setModalStatus(false)
        })
    }

    @action
    resetMsgInfo = () => {
        this.username = ''
        this.password = ''
        this.userErrorMsg = ''
        this.pwdErrorMsg = ''
    }
}

export default new Login()