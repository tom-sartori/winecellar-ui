import axios from 'axios'
import authHeader from './Auth-header'
import CONSTANTS from '../config/constants'

const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.UTILISATEUR.UTILISATEUR


class UtilisateurService {

    getListUser() {
        return axios.get(API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL, { headers: authHeader() })
    }

    getUser(userId) {
        return axios.get(API_URL + CONSTANTS.ROOT.ACTION.FIND_BY_PK_BODY + CONSTANTS.ROOT.PARAM.ID + userId, {
            headers: authHeader()
        })
    }

    deleteUser (userId, username, email) {
        return axios.delete(API_URL + CONSTANTS.ROOT.ACTION.DELETE, {
            headers: authHeader(),
            data: {
                id: userId,
                username: username,
                email: email
            }
        })
    }

    promoteAdmin (userId, username, email) {
        return axios.put(API_URL + CONSTANTS.ROOT.ACTION.PROMOTE, {
            id: userId,
            username: username,
            email: email
        },{
            headers: authHeader(),
        })
    }
}

export default new UtilisateurService()
