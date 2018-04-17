import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import Icons from 'iconsCustom'

const InfoItem = ({children, itemStyle, canPress, onPress}) => {
    const Tab = canPress ? TouchableOpacity : View
    return <Tab style={[styles.wrapperStyle, itemStyle || {}]} onPress={onPress}>
        {children}
        {canPress && <Image source={Icons.arrowRight} style={styles.arrowStyle} />}
    </Tab>
}

const styles = {
    wrapperStyle: {
        minHeight: 43,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    arrowStyle: {
        width: 10,
        height: 17,
        marginLeft: 10
    }
}

export default InfoItem