import React, {Component} from 'react'
import {ScrollView, View, Text, Image, TouchableOpacity, Alert} from 'react-native'
import {Container, InfoItem} from '../components'
import Images from '../../assets/images'
import {Actions} from 'react-native-router-flux'
import {observer, inject} from 'mobx-react/native'
import {RKey} from "../routes";

@inject('UserInfoStore')
@observer
export default class Mine extends Component {
    openAskModal() {
        Alert.alert(
            '确认退出吗？',
            '',
            [
                {text: '取消', style: 'cancel'},
                {text: '退出', onPress: () => this.logout()},
            ],
            { cancelable: false }
        )
    }

    logout() {
        const {logout} = this.props.UserInfoStore

        logout(this.gotoLogin.bind(this))
    }

    gotoLogin() {
        Actions.reset(RKey.LOGIN)
    }

    render() {
        const {
            containerStyle,
            avatorItemStyle,
            textStyle,
            itemContentStyle,
            avatorStyle,
            contentTextStyle,
            nickNameStyle,
            buttonStyle
        } = styles

        const {username, userAvatar, mobile} = this.props.UserInfoStore

        return <Container>
            <ScrollView style={containerStyle}>
                <InfoItem itemStyle={avatorItemStyle} canPress>
                    <Text style={textStyle}>头像</Text>
                    <View style={itemContentStyle}>
                        {<Image source={userAvatar ? {uri: userAvatar} : Images.defaultAvatar} style={avatorStyle} />}
                    </View>
                </InfoItem>
                <InfoItem itemStyle={nickNameStyle} canPress>
                    <Text style={textStyle}>昵称</Text>
                    <View style={itemContentStyle}>
                        <Text style={contentTextStyle}>{username}</Text>
                    </View>
                </InfoItem>
                <InfoItem>
                    <Text style={textStyle}>手机号</Text>
                    <View style={itemContentStyle}>
                        <Text style={contentTextStyle}>{mobile}</Text>
                    </View>
                </InfoItem>

                <TouchableOpacity style={buttonStyle} onPress={this.openAskModal.bind(this)}>
                    <Text style={textStyle}>退出登录</Text>
                </TouchableOpacity>
            </ScrollView>
        </Container>
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    avatorItemStyle: {
        marginVertical: 10
    },
    textStyle: {
        color: '#333',
        fontSize: 16,
        borderBottomWidth: 1,
    },
    versionStyle:{
        color: '#333',
        fontSize: 16,
    },
    itemContentStyle: {
        flex: 1,
        alignItems: 'flex-end'
    },
    avatorStyle: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    nickNameStyle: {
        borderBottomWidth: 1,
        borderColor: '#EBEBEB'
    },
    contentTextStyle: {
        color: '#B1B1B1',
        fontSize: 16
    },
    buttonStyle: {
        height: 45,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
}