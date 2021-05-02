import axios from 'axios'
import Routes from './Routes.js'

const uploadFile = async(accessToken,category_id,info_id,file) => {
    try{
        const config = {
            headers: {
                accessToken
            },
            params: {
                category_id,
                info_id
            }
        }
        const fb = new FormData()
        fb.append("file",file)
        const response = await axios.post(Routes.URL_FILE,fb,config)
        console.log("--- CODE " + response.status + ": !")
        return {
            status: response.status,
            data: response.data,
        }
    }catch(error){
        console.log(error)
        return {
            status: error.response.status,
        }
    }
}


const downloadFile = async(accessToken,file_id) => {
    console.log(file_id)
    try{
        const config = {
            headers: {
                accessToken
            },
            params: {
                file_id
            }
        }
        const response = await axios.get(Routes.URL_FILE,config)
        console.log("--- CODE " + response.status + ": !")
        return {
            status: response.status,
            data: response.data
        }
    }catch(error){
        console.log(error)
        return {
            status: error.response.status,
        }
    }
}

export {uploadFile,downloadFile}