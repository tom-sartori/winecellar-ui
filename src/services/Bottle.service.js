import axios from 'axios'
import authHeader from './Auth-header'
import CONSTANTS from '../config/constants'

const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.BOTTLE.BOTTLE


class CellarService {

    // Need a user token to return his cellars.
    getListBottle({ order, direction }) {
        return axios.get(
            API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL +
            CONSTANTS.ROOT.PARAM.ORDER + order +
            CONSTANTS.ROOT.PARAM.DIRECTION + direction
            , { headers: authHeader() })
    }

    // Need a user token to return his cellars.
    getListBottleByWall({ wallId, order, direction }) {
        return axios.get(
            API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL +
            CONSTANTS.ROOT.PARAM.WALL_ID + wallId +
            CONSTANTS.ROOT.PARAM.ORDER + order +
            CONSTANTS.ROOT.PARAM.DIRECTION + direction
            , { headers: authHeader() })
    }

    // Need a user token to return his cellars.
    getListBottleByCompartment({ compartmentId, order, direction }) {
        return axios.get(
            API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL +
            CONSTANTS.ROOT.PARAM.COMPARTMENT_ID + compartmentId +
            CONSTANTS.ROOT.PARAM.ORDER + order +
            CONSTANTS.ROOT.PARAM.DIRECTION + direction
            , { headers: authHeader() })
    }

    // Need a user token to return his cellars.
    createBottle(data) {
        return axios.post(API_URL + CONSTANTS.ROOT.ACTION.CREATE,
            data,
            { headers: authHeader() }
        )
    }

    // Need a user token to return his cellars.
    deleteByCompartment(bottleId, compartmentId) {
        return axios.delete(
            API_URL +
            CONSTANTS.ROOT.ACTION.DELETE +
            CONSTANTS.ROOT.PARAM.ID + bottleId +
            CONSTANTS.ROOT.PARAM.COMPARTMENT_ID + compartmentId,
            { headers: authHeader() }
        )
    }
}

export default new CellarService()
