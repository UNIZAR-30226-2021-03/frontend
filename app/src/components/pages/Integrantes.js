import { Box, Container } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import keyImage from '../../resources/key-1315566.jpg';


const useStyles = makeStyles((theme) => ({
    integrantesText: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '1000px',
        transform: 'translate(-50%, -50%)',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: '50px',
        textAlign: 'center',
        paddingTop: '15px',
    },
    description: {
        fontSize: '30px',
        textAlign: 'center',
    },

    container: {
        /* The image used */
        backgroundImage: 'url('+ keyImage +')',

        /* Full height */
        minHeight: '80vh', // TODO mal, hacer relativo (COMO??)
        /*width: 100%, */
        margin: '0',

        /* Center and scale the image nicely */
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

        flex:'1'
    }
}));

const Integrantes = () => {

    const classes = useStyles();

    return (
        <Container component='div' maxWidth='xl' className='container'>
            <Box component="div" className={classes.integrantesText}>
                <Box component="div" className={classes.title}>
                    Integrantes de KeyPax
                </Box>
                <Box component="div" className={classes.description}>
                    Aquí vamos a hablar sobre quienes somos...
                </Box>
            </Box>
        </Container>

    )
}

export default Integrantes;