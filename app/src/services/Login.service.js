import axios from 'axios'
import Routes from './routes.js'

const login = async () => {
    //console.log(res)
    return Routes.URL_LOGIN 
    const res = await axios.get(Routes.export.URL_LOGIN)
    console.log(res)
    return res.data;
}

export default login;