import {observable, action} from 'mobx'

import * as addressPro from '../config/addressPro'
import * as addressDev from '../config/addressDev'

class AppEnv {
    @observable address = addressDev
}
export default new AppEnv()