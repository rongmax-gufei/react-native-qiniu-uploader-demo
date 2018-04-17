import React from 'react'
import {Scene, Stack, Router} from 'react-native-router-flux'
import {
    Launch,
    Login,
    Home
} from './pages'

export const RKey = {
    ROOT: 'root',
    LAUNCH: 'Launch',
    LOGIN: 'Login',
    HOME_NAV: 'HomeNav',
    HOME: 'Home',
    MINE: 'Mine'
}

const ROUTER = () => (<Router>
  <Stack key={RKey.ROOT}>
    <Scene key={RKey.LAUNCH} initial={true} component={Launch} hideNavBar={true} />
    <Scene key={RKey.LOGIN} component={Login} hideNavBar={true} />
    <Scene tabs key={RKey.HOME_NAV} hideTabBar={true} swipeEnabled={false}>
      <Scene key={RKey.HOME} component={Home} hideNavBar={true} swipeEnabled={false}/>
      <Scene key={RKey.MINE} component={Mine} hideNavBar={true} />
    </Scene>
  </Stack>
</Router>)

export default ROUTER