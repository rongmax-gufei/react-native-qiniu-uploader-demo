/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'

import React, {Component} from 'react'
import {FlatList} from 'react-native'
import {Modal, Toast} from 'antd-mobile'
import ImagePicker from 'react-native-image-picker'
import {QNEngine} from '../libs/QNEngine'

import {Container, EmptyView, ItemSeparator, UploadListItem, UploadHeader} from '../components/index'

import * as mobx from 'mobx'
import {observer, inject} from 'mobx-react/native'

const operation = Modal.operation;

@inject('UserInfoStore', 'UploadStore')
@observer
export default class Home extends Component {

    sources = []

    componentDidMount() {
        //所有的原生通知统一管理
        QNEngine.eventEmitter({
            onProgress: (data) => {
                const newData = mobx.toJS(this.props.UploadStore.data)
                newData.map((item) => {
                    if (item.id === data.id) {
                        item.percent = data.percent
                        item.uploadStatus = 1
                    }
                })
                this.props.UploadStore.setData(newData)
            },
            onComplete: (data) => {
                const newData = mobx.toJS(this.props.UploadStore.data)
                newData.map((item) => {
                    if (item.id === data.id) {
                        item.percent = data.percent
                        item.uploadStatus = 3
                    }
                })
                this.props.UploadStore.setData(newData)
            },
            onError: (data) => {
                console.log(data);
                switch (data.code) {
                    case '-2':
                        Toast.info('任务已暂停', 2)
                        break;
                    default:
                        Toast.fail('错误：' + data.msg, 2)
                        break;
                }
            }
        })
    }

    componentWillUnmount() {
        QNEngine.removeEmitter()
    }

    _keyExtractor = (item, index) => index;

    _onPressItem = (id) => {

        let data = null

        this.props.UploadStore.data.map(item => {
            if (item.id === id)
                data = item
        })

        switch (data.uploadStatus) {
            case 0:
                // 未开始上传
                this.props.UserInfoStore.getUploadToken(null, resp => {
                    /**
                     * @param id       文件id
                     * @param filePath 文件路径
                     * @param upKey    文件名（唯一，不能重复）
                     * @param upToken  上传token，服务端获取或本地生成
                     * @param zone     上传至指定区域：华东1,华北2,华南3,北美4
                     */
                    const params = {
                        id: data.id,
                        filePath: data.filePath,
                        upKey: 'file_' + Math.random(),
                        upToken: resp.uptoken,
                        zone: 1
                    }
                    QNEngine.setParams(params)
                    QNEngine.startTask()
                })
                break
            case 1:
                // 正在上传，点击后暂停
                QNEngine.pauseTask()
                const newData = mobx.toJS(this.props.UploadStore.data)
                newData.map((item) => {
                    if (item.id === id) {
                        item.uploadStatus = 2
                    }
                })
                this.props.UploadStore.setData(newData)
                break;
            case 2:
                // 已经暂停，点击后恢复上传
                QNEngine.resumeTask()
                break
        }
    };

    _doActionToChooseFile = () => {

        operation([
            {
                text: '选择图片',
                onPress: () => {
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

                        let obj = {
                            id: String(Math.random()),
                            fileName: response.fileName,
                            fileSize: response.fileSize,
                            filePath: response.uri,
                            uploadStatus: 0,
                            percent: ''
                        };
                        this.sources.push(obj)
                        this.props.UploadStore.setData(this.sources)
                    });
                }
            },
            {
                text: '选择视频',
                onPress: () => {
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
                        let obj = {
                            id: String(Math.random()),
                            fileName: String(Math.random()),
                            fileSize: '',
                            filePath: response.uri,
                            uploadStatus: 0,
                            percent: ''
                        };
                        this.sources.push(obj)
                        this.props.UploadStore.setData(this.sources)
                    });
                }
            },
        ])
    };

    // Header布局
    _renderHeader = () => (
        <UploadHeader onPress={this._doActionToChooseFile}/>
    );

    // 自定义分割线
    _renderItemSeparatorComponent = () => (
        <ItemSeparator/>
    );

    // 空布局
    _renderEmptyView = () => (
        <EmptyView/>
    );

    _renderItem = ({item, i}) => {
        return (
            <UploadListItem
                id={item.id}
                onPressItem={this._onPressItem}
                fileName={item.fileName}
                fileSize={item.fileSize}
                uploadStatus={item.uploadStatus}
            />
        );
    };

    render() {

        return (
            <Container>
                <FlatList
                    style={styles.containerStyle}
                    ref={ref => this.flatList = ref}
                    data={this.props.UploadStore.data}
                    extraData={this.props.UploadStore.selected}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ListHeaderComponent={this._renderHeader}
                    ItemSeparatorComponent={this._renderItemSeparatorComponent}
                    ListEmptyComponent={this._renderEmptyView}
                    // 是一个可选的优化，用于避免动态测量内容；+50是加上Header的高度
                    getItemLayout={(data, index) => ( {length: 40, offset: (40 + 1) * index + 50, index} )}
                />
            </Container>
        );
    }
}

const styles = {

    containerStyle: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }

};

