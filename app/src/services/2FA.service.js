import axios from 'axios'
import Routes from './Routes.js'

const send2FA = async (_2faToken, code) => {
    try {
        const body = { _2faToken, code }
        const response = await axios.post(Routes.URL_2FA, body)
        console.log("--- CODE " + response.status + ": !")
        return {
            status: response.status,
            data: response.data,
        }
    }
    catch (error) {     
        return {
            status: error.response.status,
        }
    }
}

export default send2FA;