import CONSTANTS from '../config/constants'
import axios from 'axios'
import encrypt from '../store/crypto'
const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.UTILISATEUR.AUTHENTICATION


class AuthService {
    // Signup.
    register(user) {
        return axios
            .post(API_URL + CONSTANTS.ROOT.ACTION.SIGNUP, {
                username: encrypt(user.username),
                firstName: encrypt(user.firstName),
                lastName: encrypt(user.lastName),
                email: encrypt(user.email),
                password: encrypt(user.password)
            })
    }

    // Signing.
    login(user) {
        return axios
            .post(API_URL + CONSTANTS.ROOT.ACTION.SIGNIN, {
                username: encrypt(user.username),
                password: encrypt(user.password)
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data))
                }
                return response.data
            })
    }

    // Log out.
    logout() {
        localStorage.removeItem('user')
    }
}

export default new AuthService()
