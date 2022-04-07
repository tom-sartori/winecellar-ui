import axios from 'axios'
import authHeader from './Auth-header'
import CONSTANTS from '../config/constants'

const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.CELLAR.CELLAR


class CellarService {

    // Need a user token to return his cellars.
    getCellar() {
        return axios.get(API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL, { headers: authHeader() })
    }

    createCellar(name) {
        return axios.post(API_URL + CONSTANTS.ROOT.ACTION.CREATE,
            { name: name },
            { headers: authHeader() }
        )
    }
}

export default new CellarService()
