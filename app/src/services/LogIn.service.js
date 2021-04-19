import axios from 'axios'
import Routes from './Routes.js'

const sendLogIn = async (email, password) => {
    console.log(Routes.URL_LOGIN)
    try {
        const body = { email, password }
        const response = await axios.post(Routes.URL_LOGIN, body)
        console.log("--- CODE " + response.status + ": !")
        return {
            status: response.status,
            data: response.data,
        }
    }
    catch (error) {
        console.log(error)
        return {
            status: error.response.status,
        }
    }
}

export default sendLogIn;