import axios from 'axios'
import authHeader from './auth-header'
import CONSTANTS from '../config/constants'

const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.CAVE.MUR


class CaveService {

    getMurImageSrc (imageSrc) {
        return process.env.VUE_APP_API_URL + CONSTANTS.ROOT.IMAGE.MUR_IMAGE_PATH + '/' + imageSrc
    }

    getMur (murId) {
        return axios.get(API_URL + CONSTANTS.ROOT.ACTION.FIND_BY_PK + CONSTANTS.ROOT.PARAM.ID + murId,
            { headers: authHeader() })
    }

    getListMur (caveId) {
        return axios.get(API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL + '/cave-id/' + caveId,
            {
                // params: { 'id': '1' },   Not working. 404.
                headers: authHeader()
            })
    }

    createMur(fd) {
        return axios.post(API_URL + CONSTANTS.ROOT.ACTION.CREATE, fd, {
            onUploadProgress: uploadEvent => {
                console.log('Upload progress : ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
            }
        })
    }
}

export default new CaveService()
