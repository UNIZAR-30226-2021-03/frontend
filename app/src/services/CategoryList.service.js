import axios from 'axios'
import Routes from './Routes.js'

const getCategoryList = async (accessToken) => {
    try {
        console.log(Routes.URL_CATEGORY_LIST)
        const config = {
            headers: {
                accessToken
            }
        }
        const response = await axios.get(Routes.URL_CATEGORY_LIST, config)
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

export default getCategoryList;
