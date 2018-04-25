import React, {Component} from 'react'
import {
    Text,
    TouchableOpacity,
    View,
    PixelRatio,
    Platform
} from 'react-native'

const UploadListItem = ({id, fileName, fileSize, uploadStatus, onPressItem}) => {

    // 0:未开始 1：进行中 2：已暂停 3：已完成
    let _uploadStatus = ''
    switch (uploadStatus) {
        case 0:
            _uploadStatus = '未开始'
            break
        case 1:
            _uploadStatus = '上传中'
            break
        case 2:
            _uploadStatus = '已暂停'
            break
        case 3:
            _uploadStatus = '已完成'
            break
    }

    _onPress = () => {
        uploadStatus !== 3 && onPressItem(id);
    };

    return (
        <View style={styles.containerStyle}>
            <View style={styles.leftWrapperStyle}>
                <Text numberOfLines={1} ellipsizeMode='middle'>{fileName}</Text>

                <Text>文件大小：{fileSize}</Text>
            </View>

            <TouchableOpacity
                {...this.props}

                onPress={this._onPress}
                style={styles.rightWrapperStyle}
            >
                <Text style={styles.uploadTextStyle}>{_uploadStatus}</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    leftWrapperStyle: {
        flexDirection: 'column', flex: 1
    },
    rightWrapperStyle: {
        width: 70,
        height: 30,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#cccccc',
        borderRadius: 15,
        borderWidth: (Platform.OS === 'ios' ? 1.0 : 1.5) / PixelRatio.get()
    },
    uploadTextStyle: {
        fontSize: 14
    }
}

export default UploadListItem