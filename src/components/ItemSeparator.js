import React, {PureComponent} from 'react'
import {
    View
} from 'react-native'

const ItemSeparator = () => {
    return <View style={styles.line}/>
}

const styles = {
    line: {
        height: 0.5,
        backgroundColor: '#cccccc'
    }
};

export default ItemSeparator