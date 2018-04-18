/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict'

import React, { Component } from 'react'
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

import { RtcEngine } from '../libs/qiniu'
import ImagePicker from 'react-native-image-picker'


@inject('UserInfoStore', 'StatusModalStore')
@observer
export default class Home extends Component {

  componentWillMount() {
    const options = {
      useHttps: true,// useHttps:使用https=true，否则false
      zoneTarget: 1 // zoneTarget:华东1,华北2,华南3,北美4
    }
    RtcEngine.init(options)
  }

  componentDidMount() {
    //所有的原生通知统一管理
    RtcEngine.eventEmitter({
      onUploading: (data) => {
          console.log(data);
      },
      onComplete: (data) => {
          console.log(data)
      },
      onError: (data) => {
          console.log(data);
      }
    })
  }

  componentWillUnmount() {
    RtcEngine.removeEmitter()
  }

  onButtonPress = (type) => {
    switch(type) {
      case 1:
          const {getUploadToken} = this.props.UserInfoStore
          const {setModalStatus} = this.props.StatusModalStore
          setModalStatus(true)
          getUploadToken(null, data => {
              RtcEngine.uploadFileToQiniu(data.uptoken, this.state.avatarSource, 'video_test')
          })
        break
      case 2:
        RtcEngine.cancelUploadTask()
        break
    }
  }

  state = {
    avatarSource: null,
    videoSource: null
  };

  selectPhotoTapped() {

    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

          console.log("image picker response:"+ response)
        this.setState({
          avatarSource: source
        });
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        console.log("video picker response:"+ response)
        this.setState({
          videoSource: response.uri
        });
      }
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
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>Select a Video</Text>
          </View>
        </TouchableOpacity>

        { this.state.videoSource &&
          <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
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
