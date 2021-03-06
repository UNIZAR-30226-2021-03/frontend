import axios from 'axios'
import Routes from './Routes.js'

const createInfo = async (accessToken, name, username, password, url, description, category_id) => {
    console.log("Info.service: acctoken: ", accessToken)
    try {
        const config = {
            headers: {
                accessToken
            }
        }
        var body = {
            name,
            username,
            password,
            category_id
        }
        if (url !== "") {
            body.url = url
        }
        if (description !== "") {
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
    console.log("Info.service: acctoken: ", accessToken)

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
    console.log("Info.service: acctoken: ", accessToken)

    try {
        const config = {
            headers: {
                accessToken
            }
        }
        var body = {
            name,
            password,
            username,
            category_id,
            info_id,
        }

        if (url !== "") {
            body.url = url
        }
        if (description !== "") {
            body.description = description
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