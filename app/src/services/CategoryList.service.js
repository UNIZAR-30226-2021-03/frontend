import axios from 'axios'
import Routes from './Routes.js'

const getCategoryList = async () => {
    try {
        console.log(Routes.URL_CATEGORY_LIST)
        const config = {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }
        const response = await axios.get(Routes.URL_CATEGORY_LIST, config)
        console.log("--- CODE " + response.status + ": !")
        return response.data
    }
    catch (error) {
        return error
        return error.response.status
    }
}

export default getCategoryList;

// localStorage.getItem("accessToken")