import React, {PureComponent} from 'react'
import {
    View
} from 'react-native'

class ItemSeparator extends PureComponent {

    render() {
        return (
            <View style={styles.line}/>
        );
    }
}

const styles = {
    line: {
        height: 0.5,
        backgroundColor: '#cccccc'
    }
};

export default ItemSeparator