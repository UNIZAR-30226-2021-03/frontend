import axios from 'axios'

const pruebas = async () => {
    const res = await axios.get('http://localhost:8080/public')
    console.log(res)
    return res.data;
}

export default pruebas;