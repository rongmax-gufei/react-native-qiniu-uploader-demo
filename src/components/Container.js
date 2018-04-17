import React from 'react'
import {View, Platform} from 'react-native'
import {isIphoneX} from "../libs/utils"

const Container = (props) => {
    const containerStyle = {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: isIphoneX() ? 44 : Platform.OS === 'ios' ? 20 : 0
    }
    return <View style={containerStyle}>{props.children}</View>
}

export default Container