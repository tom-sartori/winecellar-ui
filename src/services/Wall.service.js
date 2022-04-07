import axios from 'axios'
import authHeader from './Auth-header'
import CONSTANTS from '../config/constants'

const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.CELLAR.WALL


class WallService {

    getWallImageSrc (imageSrc) {
        return process.env.VUE_APP_CLOUD_URL + imageSrc
    }

    getListWall (cellarId) {
        return axios.get(API_URL + CONSTANTS.ROOT.ACTION.FIND_ALL + '/cellar-id/' + cellarId,
            {
                // params: { 'id': '1' },   Not working. 404.
                headers: authHeader()
            })
    }

    createWall(fd) {
        return axios.post(API_URL + CONSTANTS.ROOT.ACTION.CREATE, fd, {
            onUploadProgress: uploadEvent => {
                console.log('Upload progress : ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
            },
            headers: authHeader()
        })
    }

    deleteWall (wallId) {
        return axios.delete(API_URL + CONSTANTS.ROOT.ACTION.DELETE + CONSTANTS.ROOT.PARAM.ID + wallId, { headers: authHeader() })
    }
}

export default new WallService()
