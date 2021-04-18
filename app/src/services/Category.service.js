import axios from 'axios'
import Routes from './Routes.js'

const createCategory = async (name) => {
    try {
        const config = {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }
        const body = {name}
        const response = await axios.post(Routes.URL_CATEGORY, body, config)
        console.log("--- CODE " + response.status + ": !")
        return response.data
    }
    catch (error) {
        return error.response.status
    }
}

export default createCategory;

// localStorage.getItem("accessToken")