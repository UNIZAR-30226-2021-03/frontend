import axios from 'axios'
import React, { useContext } from 'react'
import Routes from './Routes.js'
import AuthContext from '../context'

const createCategory = async (accessToken, name) => {
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