import axios from 'axios'
import authHeader from './auth-header'
import CONSTANTS from '../config/constants'

const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.CAVE.CAVE


class CaveService {

    // Need a user token to return his caves.
    getCave() {
        return axios.get(API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL, { headers: authHeader() })
    }

    createCave(name) {
        return axios.post(API_URL + CONSTANTS.ROOT.ACTION.CREATE,
            { name: name },
            { headers: authHeader() }
        )
    }
}

export default new CaveService()
