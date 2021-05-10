import axios from 'axios'
import Routes from './Routes.js'

const createInfo = async (accessToken, name, username, password, url, description, category_id) => {
    try {
        const config = {
            headers: {
                accessToken
            }
        }
        
        const body = {
            name,
            username,
            password,
            category_id
        }
        if (url !== null) {
            body.url = url
        }
        if (description !== null) {
            body.description = description
        }

        const response = await axios.post(Routes.URL_INFO, body, config)
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

const deleteInfo = async (accessToken, category_id, info_id) => {
    try {
        const config = {
            headers: {
                accessToken
            },
            params: {
                category_id,
                info_id
            }
        }
        const response = await axios.delete(Routes.URL_INFO, config)
        console.log("--- CODE " + response.status + ": !")
        return {
            status: response.status,
        }
    }
    catch (error) {
        return {
            status: error.response.status,
        }
    }
}

const renameInfo = async (accessToken, name, username, password, url, description, category_id, info_id) => {
    try {
        const config = {
            headers: {
                accessToken
            }
        }
        const body = {
            name,
            password,
            username,
            url,
            description,
            category_id,
            info_id,
        }
        const response = await axios.put(Routes.URL_INFO, body, config)
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

export { createInfo, deleteInfo, renameInfo };