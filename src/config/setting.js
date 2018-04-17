import Images from 'imagesCustom'

export const CUSTOMURL = 'http://lcdns.pic.lotlot.com/'

export const UPLOAD_IMAGE_STATUS = {
    LOADING: 1,
    FINISHED: 2,
    FAILURE: 3
}

export const URL_REG = /^(.*?)((?:(?:http:\/\/)?|(?:https:\/\/)?|(?:www\.)?)(?:\w+\.)+(?:com|cn|net|org|asp|jsp|html|edu))((?:\/[^\u2E80-\u9FFF]*)*|(?:\?[^\u2E80-\u9FFF]*)*)(.*)$/i
//export const URL_REG = /^(.*?)([http:\/\/|https:\/\/|www\.](?:\w+\.)+(?:com|cn|net))((?:\/[^\u2E80-\u9FFF]*)*|(?:\?[^\u2E80-\u9FFF]*)*)(.*)$/i

export const VERSION = '2.0.1'
export const BUILD_NO = 1

export const MOBILE_REG = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/

export const RESPONSE_CODE = {
    SUCCESS: '0'
}

export const GLOBAL_TIMEOUT = 30

export const PRIVILEGE_STATUS = {
    ON: 0,
    OFF: 1
}

export const SYSTEM_IDS = {
    STUDENT_APP: 9,
    TEACHER_APP: 8,
    CC_APP: 7
}