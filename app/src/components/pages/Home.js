import React, { useEffect, useState } from 'react'
import prueba from '../../services/prueba'
import { Container } from '@material-ui/core';


const Home = () => {

    const [data, setData] = useState({})
    useEffect(() => {
        start()
        async function start() {
            console.log('hola')
            const res = await prueba()
            console.log(res)
            setData(res)
        }
    }, [])

    return (
        <Container component='main' maxWidth='xl'>

            <div className="Home">
                <h1> hola </h1>

            HOMEEE
            Hllo

            # el container y/o CSSBaseline modifican la altura y padding de los links de nacbar
            {data.user}
            </div>
        </Container>
    )
}

export default Home;