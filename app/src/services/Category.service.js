import axios from 'axios'
import Routes from './Routes.js'

const createCategory = async (accessToken, name) => {
    console.log("Category.service: acctoken: ", accessToken)
    try {
        const config = {
            headers: {
                accessToken
            }
        }
        const body = { name }
        const response = await axios.post(Routes.URL_CATEGORY, body, config)
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

const deleteCategory = async (accessToken, category_id) => {
    console.log("Category.service: acctoken: ", accessToken)
    try {
        const config = {
            headers: {
                accessToken
            },
            params: {
                category_id
            }
        }
        const response = await axios.delete(Routes.URL_CATEGORY, config)
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

const renameCategory = async (accessToken, name, category_id) => {
    console.log("Category.service: acctoken: ", accessToken)
    try {
        const config = {
            headers: {
                accessToken
            },
        }
        const body = {
            name,
            category_id,
        }
        const response = await axios.put(Routes.URL_CATEGORY, body, config)
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

export { createCategory, deleteCategory, renameCategory };