import React, {PureComponent} from 'react'
import {
    Text,
    View
} from 'react-native'

class EmptyView extends PureComponent {

    render() {
        return <View style={styles.containerStyle}>
            <Text style={styles.titleStyle}>暂无记录</Text>
        </View>
    }
}

const styles = {

    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: 100
    },

    titleStyle: {
        color: '#666666'
    }
}

export default EmptyView