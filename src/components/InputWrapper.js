import React from 'react'
import {View} from 'react-native'

const InputWrapper = ({children}) => {
    return <View style={styles.wrapperStyle}>
        {children}
    </View>
}

const styles = {
    wrapperStyle: {
        height: 45,
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: '#EBEBEB',
        borderRadius: 50,
        justifyContent: 'center',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    } 
} 

export default InputWrapper