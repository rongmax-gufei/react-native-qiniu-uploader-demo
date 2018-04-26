import {observable, action} from 'mobx'

class Upload {

    @observable data = []
    @observable selected = []
    @observable refreshing

    @action
    setData = (data) => {
        this.data = data
    }

    @action
    setSelected = (selected) => {
        this.selected = selected;
    }

    @action
    setRefreshing = (refreshing) => {
        this.refreshing = refreshing
    }

}

export default new Upload()