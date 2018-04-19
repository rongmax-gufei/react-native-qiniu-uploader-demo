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
    PixelRatio,
    TouchableOpacity,
    Image,
    View
} from 'react-native'

import {observer, inject} from 'mobx-react/native'
import {Toast} from 'antd-mobile'
import {RtcEngine} from '../libs/qiniu'
import ImagePicker from 'react-native-image-picker'

@inject('UserInfoStore', 'StatusModalStore')
@observer
export default class Home extends Component {

    componentDidMount() {
        //所有的原生通知统一管理
        RtcEngine.eventEmitter({
            onUploading: (data) => {
                console.log(data);
            },
            onComplete: (data) => {
                console.log(data)
                switch (data.code) {
                    case '1000':
                        Toast.success('上传完成', 2)
                        break;
                    default:
                        Toast.fail(data.msg, 2)
                        break;
                }
            },
            onError: (data) => {
                console.log(data);
                Toast.fail(data.msg, 2)
            }
        })
    }

    componentWillUnmount() {
        RtcEngine.removeEmitter()
    }

    onButtonPress = (type) => {
        switch (type) {
            case 1:
                const {getUploadToken} = this.props.UserInfoStore
                const {setModalStatus} = this.props.StatusModalStore
                setModalStatus(true)
                getUploadToken(null, data => {
                    /**
                     * @param filePath:文件路径
                     * @param key:文件名（唯一，不能重复）
                     * @param token:上传token，服务端获取或本地生成
                     * @param zone:上传至指定区域：华东1,华北2,华南3,北美4
                     */
                    RtcEngine.uploadFileToQNFilePath(this.state.uri, 'file_' + Math.random(), data.uptoken, 1)
                })
                break
            case 2:
                RtcEngine.cancelUploadTask()
                break
        }
    }

    state = {
        uri: null,
        percent: null
    };

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
                    onPress={this.onButtonPress.bind(this, 1)}
                    title="上传文件"/>
                <Button
                    onPress={this.onButtonPress.bind(this, 2)}
                    title="取消上传"/>
                <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                    <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
                        {this.state.uri === null ? <Text>图片</Text> :
                            <Image style={styles.avatar} source={{uri: this.state.uri}}/>
                        }
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
                    <View style={[styles.avatar, styles.avatarContainer]}>
                        <Text>视频</Text>
                    </View>
                </TouchableOpacity>
                {this.state.percent &&
                <Text style={{margin: 8, textAlign: 'center'}}>{this.state.percent}</Text>
                }
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
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 75,
        width: 150,
        height: 150
    }
});
