import {observable, action} from 'mobx'

class Upload {

    @observable sourceData
    @observable selected
    @observable refreshing

    @action
    setSourceData = (datas) => {
        this.sourceData = datas
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