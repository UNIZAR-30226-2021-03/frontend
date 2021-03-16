import React, {useEffect, useState} from 'react'
import prueba from '../services/prueba'
const Home = () => {
    const [data, setData] = useState({})
    useEffect(() => {
        start()

        async function start(){
        console.log('hola')
        const res = await  prueba()
        console.log(res)
         setData(res)
        }

    },[])
    return( 
        <div style={{flex:1,backgroundColor:'pink'}}>
            hola
            {data.user}
        </div>
    )
}

export default Home;