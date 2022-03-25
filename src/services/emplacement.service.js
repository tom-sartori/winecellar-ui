import axios from 'axios'
import authHeader from './auth-header'
import CONSTANTS from '../config/constants'

const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.CAVE.EMPLACEMENT


class EmplacementService {

    // getCaveImageSrc (imageSrc) {
    //     return process.env.VUE_APP_API_URL + CONSTANTS.ROOT.IMAGE.MUR_IMAGE_PATH + '/' + imageSrc
    // }

    getListEmplacement (murId) {
        return axios.get(API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL + CONSTANTS.ROOT.PARAM.MUR_ID + murId,
            { headers: authHeader() })
    }

    createEmplacement(murId, listPoint) {
        let data =
            {
            "murId": murId,
            "points": listPoint
        }

        return axios.post(API_URL + CONSTANTS.ROOT.ACTION.CREATE, data, { headers: authHeader() })
    }

    deleteEmplacement(emplacementId) {
        return axios.delete(API_URL + CONSTANTS.ROOT.ACTION.DELETE + CONSTANTS.ROOT.PARAM.ID + emplacementId, { headers: authHeader() })
    }
}

export default new EmplacementService()
