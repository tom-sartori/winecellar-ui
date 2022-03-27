import axios from 'axios'
import authHeader from './Auth-header'
import CONSTANTS from '../config/constants'

const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.BOUTEILLE.BOUTEILLE


class CaveService {

    // Need a user token to return his caves.
    getListBouteille() {
        return axios.get(API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL, { headers: authHeader() })
    }

    // Need a user token to return his caves.
    getListBouteilleByMur(murId) {
        return axios.get(
            API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL + CONSTANTS.ROOT.PARAM.MUR_ID + murId,
            { headers: authHeader() })
    }

    // Need a user token to return his caves.
    getListBouteilleByEmplacement(emplacementId) {
        return axios.get(
            API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL + CONSTANTS.ROOT.PARAM.EMPLACEMENT_ID + emplacementId,
            { headers: authHeader() })
    }

    // Need a user token to return his caves.
    createBouteille(data) {
        return axios.post(API_URL + CONSTANTS.ROOT.ACTION.CREATE,
            data,
            { headers: authHeader() }
        )
    }

    // Need a user token to return his caves.
    deleteByEmplacement(bouteilleId, emplacementId) {
        return axios.delete(
            API_URL +
            CONSTANTS.ROOT.ACTION.DELETE +
            CONSTANTS.ROOT.PARAM.ID + bouteilleId +
            CONSTANTS.ROOT.PARAM.EMPLACEMENT_ID + emplacementId,
            { headers: authHeader() }
        )
    }
}

export default new CaveService()
