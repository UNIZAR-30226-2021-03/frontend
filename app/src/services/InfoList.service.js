import axios from 'axios'
import Routes from './Routes.js'

const getInfoList = async (accessToken, category_id) => {
    try {
        const config = {
            headers: {
                accessToken
            },
            params: {
                category_id
            }
        }
        const response = await axios.get(Routes.URL_INFO_LIST, config)
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

export default getInfoList;
