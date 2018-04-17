import React from 'react'
import {TouchableOpacity, Text} from 'react-native'

let clickFlag = false

const Button = ({type, size = 'big', disabled, onPress, children, style = {}}) => {
    const {
        wrapperCStyle,
        textCStyle,
        okBtnStyle,
        cancelBtnStyle
    } = commonStyles

    const {wrapperTStyle, textTStyle} = eval([size] + 'ThemeStyles')

    const {wrapperStyle: wrapperPStyle, textStyle: textPStyle} = style
    return <TouchableOpacity style={[
            wrapperCStyle,
            type==='cancel' ? cancelBtnStyle : okBtnStyle, 
            wrapperTStyle,
            wrapperPStyle]} 
            onPress={() => {
                if (!disabled || !clickFlag) {
                    clickFlag = true
                    onPress()
                    setTimeout(() => {clickFlag = false}, 300)
                }
            }}>
        <Text style={[textCStyle, textTStyle, textPStyle]}>{children}</Text>
    </TouchableOpacity>
}

 const commonStyles = {
     wrapperCStyle: {
         borderRadius: 50,
         justifyContent: 'center',
         alignItems: 'center'
     },
     textCStyle: {
        color: '#fff'
     },
     okBtnStyle: {
         backgroundColor: '#FF9E16'
     },
     cancelBtnStyle: {
         backgroundColor: '#CBCFD6'
     }
 }

 const miniThemeStyles = {
    wrapperTStyle: {
        width: 60,
        height: 23
    },
    textTStyle: {
        fontSize: 12
    }
}

const smallThemeStyles = {
     wrapperTStyle: {
         width: 80,
         height: 35
     },
     textTStyle: {
         fontSize: 14
     }
 }

const bigThemeStyles = {
     wrapperTStyle: {
         height: 45
     },
     textTStyle: {
         fontSize: 16
     }
 }

 export default Button
 