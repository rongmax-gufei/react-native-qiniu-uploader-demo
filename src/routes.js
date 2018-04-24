import React from 'react'
import {Scene, Stack, Router} from 'react-native-router-flux'
import {
    Launch,
    Login,
    Home,
    Mine
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
    <Scene key={RKey.LAUNCH} initial component={Launch} hideNavBar />
    <Scene key={RKey.LOGIN} component={Login} hideNavBar />
    <Scene tabs key={RKey.HOME_NAV} hideTabBar swipeEnabled={false}>
      <Scene key={RKey.HOME} component={Home} hideNavBar swipeEnabled={false}/>
      <Scene key={RKey.MINE} component={Mine} hideNavBar />
    </Scene>
  </Stack>
</Router>)

export default ROUTER