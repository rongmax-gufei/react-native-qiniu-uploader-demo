import { observable, action } from 'mobx'

class StatusModal {

    @observable modalVisible = false

    @action
    setModalStatus = (val) => {
        this.modalVisible = val
    }
}

export default new StatusModal()