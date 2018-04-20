/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'

import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native'

import {observer, inject} from 'mobx-react/native'
import {Toast} from 'antd-mobile'
import {QNEngine} from '../libs/QNEngine'
import ImagePicker from 'react-native-image-picker'

@inject('UserInfoStore', 'StatusModalStore')
@observer
export default class Home extends Component {

    componentDidMount() {
        //所有的原生通知统一管理
        QNEngine.eventEmitter({
            onProgress: (data) => {
                console.log(data);
                this.setState({
                    percent: data.percent,
                    taskStatus: 1,
                    taskText: '上传中（' + data.percent + '），点击可暂停'
                });
            },
            onComplete: (data) => {
                console.log(data)
                this.resetStatus()
                Toast.success('上传完成', 2)
            },
            onError: (data) => {
                console.log(data);
                switch (data.code) {
                    case '-2':
                        Toast.info('任务已暂停', 2)
                        break;
                    default:
                        Toast.fail('错误：'+data.msg, 2)
                        break;
                }
            }
        })
    }

    componentWillUnmount() {
        QNEngine.removeEmitter()
    }

    onButtonPress = () => {
        let status = this.state.taskStatus
        switch (status) {
            case 0:
                // 未开始上传和已经上传完成
                const {getUploadToken} = this.props.UserInfoStore
                const {setModalStatus} = this.props.StatusModalStore
                setModalStatus(true)
                getUploadToken(null, data => {
                    /**
                     * @param filePath:文件路径
                     * @param upKey:文件名（唯一，不能重复）
                     * @param upToken:上传token，服务端获取或本地生成
                     * @param zone:上传至指定区域：华东1,华北2,华南3,北美4
                     */
                    const params = {
                        filePath: this.state.uri,
                        upKey: 'file_' + Math.random(),
                        upToken:data.uptoken,
                        zone: 1 //
                    }
                    QNEngine.setParams(params)
                    QNEngine.startTask()
                })
                break
            case 1:
                // 正在上传，点击后暂停
                QNEngine.pauseTask()
                this.setState({
                    taskStatus: 2,
                    taskText: '已暂停，点击继续'
                });
                break;
            case 2:
                // 已经暂停，点击后恢复上传
                QNEngine.resumeTask()
                break
        }
    }

    state = {
        uri: null,
        percent: '',
        taskStatus: 0, //0:未开始 1：进行中 2：已暂停 3：已完成
        taskText: '开始上传'
    };

    resetStatus() {
        this.setState({
            uri: null,
            percent: '',
            taskStatus: 0, //0:未开始 1：进行中 2：已暂停 3：已完成
            taskText: '开始上传'
        });
    }

    selectPhotoTapped() {

        const options = {
            title: '选择图片',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从图库选择',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel || response.error)
                return
            this.setState({
                uri: response.uri
            });
        });
    }

    selectVideoTapped() {
        const options = {
            title: '选择视频',
            takePhotoButtonTitle: '录制新视频',
            chooseFromLibraryButtonTitle: '从视频库选择',
            mediaType: 'video',
            videoQuality: 'medium'
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel || response.error)
                return
            this.setState({
                uri: response.uri
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.selectPhotoTapped.bind(this)}
                    title='选图片'/>
                <Button
                    onPress={this.selectVideoTapped.bind(this)}
                    title='选视频'/>
                <Button
                    onPress={this.onButtonPress.bind(this)}
                    title={this.state.taskText}/>
                {this.state.uri &&
                <Text style={{margin: 8, textAlign: 'center'}}>{this.state.uri}</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});
