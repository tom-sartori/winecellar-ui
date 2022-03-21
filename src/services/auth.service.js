import CONSTANTS from '../config/constants'
import axios from 'axios'
const API_URL = process.env.VUE_APP_API_URL + CONSTANTS.ROOT.OBJECT.UTILISATEUR.AUTHENTICATION


class AuthService {
    // Signup.
    register(user) {
        return axios
            .post(API_URL + CONSTANTS.ROOT.ACTION.SIGNUP, {
                username: user.username,
                email: user.email,
                password: user.password
            })
    }

    // Signing.
    login(user) {
        return axios
            .post(API_URL + CONSTANTS.ROOT.ACTION.SIGNIN, {
                username: user.username,
                password: user.password
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
