import axios from 'axios'
import authHeader from './auth-header'
import CONSTANTS from '../config/constants'

const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.UTILISATEUR.TEST


class UserService {
    getPublicContent() {
        return axios.get(API_URL + '/all')
    }

    getUserBoard() {
        return axios.get(API_URL + '/user', { headers: authHeader() })
    }

    getAdminBoard() {
        return axios.get(API_URL + '/admin', { headers: authHeader() })
    }
}

export default new UserService()
