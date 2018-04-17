import React, {Component} from 'react'
import {Image} from 'react-native'
import {Container} from '../components'
import Images from '../../assets/images'
import {Actions} from 'react-native-router-flux'
import {RKey} from '../routes'

export default class Launch extends Component {

    componentDidMount() {
        Actions.reset(RKey.LOGIN)
    }

    render() {
        const {containerStyle} = styles
        return <Container>
            <Image source={Images.launch} style={containerStyle} resizeMode={'contain'} />
        </Container>
    }
}

const styles = {
    containerStyle: {
        width: '100%',
        height: '100%'
    }
}