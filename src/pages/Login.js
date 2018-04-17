import React, {Component} from 'react'
import {View, Image, Keyboard} from 'react-native'
import {Container, InputWrapper, Input, InputItem, Button, StatusModal} from '../components'
import images from '../../assets/images'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import {RKey} from '../routes'
import {SYSTEM_IDS} from '../config/setting';

@inject('LoginStore', 'UserInfoStore', 'StatusModalStore')
@observer
export default class Login extends Component {

    changeUsername(username) {
        const {setUsername} = this.props.LoginStore
        setUsername(username)
    }

    changePwd(pwd) {
        const {setPassword} = this.props.LoginStore
        setPassword(pwd)
    }

    submit() {

        const {
            username,
            password,
            setUserErrorMsg,
            setPwdErrorMsg,
            loginByTeacher
        } = this.props.LoginStore

        const {setModalStatus} = this.props.StatusModalStore

        let canSubmit = true

        if (!username) {
            setUserErrorMsg('请输入账户')
            canSubmit = false
        }
        if (!password) {
            setPwdErrorMsg('请输入密码')
            canSubmit = false
        }

        if (canSubmit) {
            setModalStatus(true)
            loginByTeacher({username: username, password: password, systemId: SYSTEM_IDS.TEACHER_APP},
                (resp) => {
                    this.loginSuccess(resp.data, username, password)
                },
                (resp) => {
                    setModalStatus(false)
                    this.loginFailure(resp)
                }
            )
        }
    }

    loginSuccess(response, username, password) {
        const {setTeacherInfo} = this.props.UserInfoStore
        const {setModalStatus} = this.props.StatusModalStore
        const {resetMsgInfo} = this.props.LoginStore

        response.user.account = username
        response.user.password = password
        setTeacherInfo(response, () => {
            resetMsgInfo()
            setModalStatus(false)
            console.log('socket init with token', response.access_token)
            Actions.reset(RKey.HOME_NAV)
        })
    }

    loginFailure(response) {
        const {setPwdErrorMsg} = this.props.LoginStore

        setPwdErrorMsg(response.message)
    }

    onFocusInput() {
        const {setUserErrorMsg, setPwdErrorMsg} = this.props.LoginStore

        setUserErrorMsg('')
        setPwdErrorMsg('')
    }

    containerTouched() {
        Keyboard.dismiss()
        return false
    }

    render() {
        const {
            contentStyle,
            inputIconStyle,
            buttonWrapperStyle,
            containerStyle
        } = styles

        const {
            username,
            password
        } = this.props.LoginStore

        const {modalVisible} = this.props.StatusModalStore

        return <Container>
            <View style={containerStyle}>
                <View style={contentStyle} onStartShouldSetResponder={this.containerTouched.bind(this)}>
                    <InputWrapper>
                        <Image source={images.userIcon} style={inputIconStyle}/>
                        <Input
                            placeholder={'请输入账号'}
                            value={username}
                            autoCorrect={false}
                            autoCapitalize='none'
                            onChangeText={this.changeUsername.bind(this)}
                            onFocus={this.onFocusInput.bind(this)}
                        />
                    </InputWrapper>
                </View>
                <InputWrapper>
                    <Image source={images.pwdIcon} style={inputIconStyle}/>
                    <Input
                        placeholder={'请输入密码'}
                        secureTextEntry
                        value={password}
                        onChangeText={this.changePwd.bind(this)}
                        onFocus={this.onFocusInput.bind(this)}
                    />
                </InputWrapper>
                <View style={buttonWrapperStyle}>
                    <Button onPress={this.submit.bind(this)}>登录</Button>
                </View>
                <StatusModal text={'正在登录'} visible={modalVisible}/>
            </View>
        </Container>
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentStyle: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 115,
    },
    logoWrapperStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25
    },
    inputIconStyle: {
        width: 19,
        height: 22,
        marginRight: 10
    },
    buttonWrapperStyle: {
        marginTop: 15
    }
}