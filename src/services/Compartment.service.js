import axios from 'axios'
import authHeader from './Auth-header'
import CONSTANTS from '../config/constants'

const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.CELLAR.COMPARTMENT


class CompartmentService {

    getListCompartment (wallId) {
        return axios.get(API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL + CONSTANTS.ROOT.PARAM.WALL_ID + wallId,
            { headers: authHeader() })
    }

    updateCompartment (compartmentId, bottleId, quantity) {
        let data =
            {
                compartmentId: compartmentId,
                bottleId: bottleId,
                quantity: quantity
            }
        return axios.put(API_URL + CONSTANTS.ROOT.ACTION.UPDATE, data, { headers: authHeader() })
    }

    createCompartment(wallId, listPoint) {
        let data =
            {
            "wallId": wallId,
            "points": listPoint
        }

        return axios.post(API_URL + CONSTANTS.ROOT.ACTION.CREATE, data, { headers: authHeader() })
    }

    deleteCompartment(compartmentId) {
        return axios.delete(API_URL + CONSTANTS.ROOT.ACTION.DELETE + CONSTANTS.ROOT.PARAM.ID + compartmentId, { headers: authHeader() })
    }
}

export default new CompartmentService()
