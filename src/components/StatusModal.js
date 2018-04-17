import React from 'react'
import {View, Modal, Image, Text} from 'react-native'
import Icons from 'iconsCustom'

const StatusModal = ({status, text, visible}) => {
    const {
        wrapperStyle,
        statusWrapperStyle,
        iconStyle,
        textStyle
    } = styles

    return <Modal visible={visible} transparent onRequestClose={() => {}}>
        <View style={wrapperStyle}>
            <View style={statusWrapperStyle}>
                <Image source={status === 'success' ? Icons.success : Icons.loading} style={iconStyle} />
                <Text style={textStyle}>{text || '正在加载'}</Text>
            </View>
        </View>
    </Modal>
}

const styles = {
    wrapperStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusWrapperStyle: {
        width: 90,
        height: 90,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconStyle: {
        width: 36,
        height: 36,
        marginBottom: 9
    },
    textStyle: {
        color: '#fff',
        fontSize: 14
    }
}

export default StatusModal