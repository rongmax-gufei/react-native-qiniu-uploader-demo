import React from 'react'
import {View, TextInput, Image, TouchableOpacity} from 'react-native'
import images from '../../assets/images'

const Input = ({placeholder, secureTextEntry, keyType, value, onChangeText, onFocus, selfStyle}) => {
    const {
        wrapperStyle, 
        inputStyle, 
        delIconWrapperStyle,
        delIconStyle
    } = styles

    return <View style={wrapperStyle}>
        <TextInput 
            autoCapitalize = 'none'
            autoCorrect = {false}
            blurOnSubmit = {true}
            placeholder = {placeholder}
            secureTextEntry = {secureTextEntry}
            underlineColorAndroid = {'transparent'}
            keyboardType={keyType}
            value = {value}
            onChangeText = {onChangeText}
            onFocus = {onFocus}
            style = {[inputStyle, selfStyle]}
        />
        {value ? <TouchableOpacity style={delIconWrapperStyle} onPress={() => {onChangeText('')}}>
            <Image source={images.deleteIcon} style={delIconStyle} />
        </TouchableOpacity> : <View></View>}
    </View>
}

const styles = {
    wrapperStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputStyle: {
        height: 45,
        flex: 1,
        fontSize: 16,
        color: '#666'
    },
    delIconWrapperStyle: {
        padding: 5
    },
    delIconStyle: {
        width: 15,
        height: 15
    }
}

export default Input