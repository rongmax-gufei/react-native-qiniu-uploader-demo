
export const UPLOAD_FILE_STATE = {
    NOT_START: 0,
    UPLOADING: 1,
    PAUSE: 2,
    FINISHED: 3
}

export const URL_REG = /^(.*?)((?:(?:http:\/\/)?|(?:https:\/\/)?|(?:www\.)?)(?:\w+\.)+(?:com|cn|net|org|asp|jsp|html|edu))((?:\/[^\u2E80-\u9FFF]*)*|(?:\?[^\u2E80-\u9FFF]*)*)(.*)$/i
//export const URL_REG = /^(.*?)([http:\/\/|https:\/\/|www\.](?:\w+\.)+(?:com|cn|net))((?:\/[^\u2E80-\u9FFF]*)*|(?:\?[^\u2E80-\u9FFF]*)*)(.*)$/i

export const MOBILE_REG = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/

export const RESPONSE_CODE = {
    SUCCESS: '0'
}

export const SYSTEM_IDS = {
    TEACHER_APP: 8
}