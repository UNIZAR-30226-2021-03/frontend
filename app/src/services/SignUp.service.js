import axios from 'axios'
import Routes from './Routes.js'

const sendSignUp = async (nickname, email, password) => {
    try {
        const body = { email, nickname, password }
        const response = await axios.post(Routes.URL_SIGNUP, body)
        return {
            status: response.status,
            data: response.data,
        }
    } catch (error) {
        console.log(error)
        return {
            status: error.response.status,
        }
    }
}

export default sendSignUp;