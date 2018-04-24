import React, {PureComponent} from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import Icons from 'iconsCustom'
import ItemSeparator from './ItemSeparator'

const UploadHeader = ({onPress}) => {
    return <View>
        <View style={styles.containerStyle}>
            <Text style={styles.titleStyle}>文件上传列表</Text>
            <TouchableOpacity
                onPress={() => {
                    onPress()
                }}
                style={styles.uploadWrapperStyle}>
                <Image source={Icons.addIcon}/>
            </TouchableOpacity>
        </View>
        <ItemSeparator/>
    </View>
}

const styles = {

    containerStyle: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },

    titleStyle: {
        flex: 1,
        color: '#666666',
        marginLeft: 10,
        alignItems: 'flex-start'
    },

    uploadWrapperStyle: {
        flex: 1,
        marginRight: 10,
        alignItems: 'flex-end'
    },
}

export default UploadHeader