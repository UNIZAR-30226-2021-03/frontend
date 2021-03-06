import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import './Landing.css';
import keyImage from '../../resources/key-1315566.jpg';

const useStyles = makeStyles((theme) => ({

    landingText: {
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

    },
    subtitle: {
        fontSize: '35px',
        textAlign: 'center',
    },
    description: {
        fontSize: '25px',
        textAlign: 'center',
    },

    container: {
        /* The image used */
        backgroundImage: 'url(' + keyImage + ')',

        /* Full height */
        minHeight: '80vh', // TODO mal, hacer relativo (COMO??)
        /*width: 100%, */
        margin: '0',

        /* Center and scale the image nicely */
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

        flex: '1'
    }
}));
/*
const keyImage = require('../../resources/key-1315566.jpg');

const divStyle = {
    width: '88%',
    height: '800px',
    backgroundImage: `url(${keyImage})`,
    backgroundSize: 'cover'
}
*/

const Landing = () => {

    const classes = useStyles();

    return (
        <Box component="div" className={classes.landingText}>
            <Typography className={classes.title}>
                KeyPaX
                </Typography>
            <Typography className={classes.subtitle}>
                Gestor de contraseñas seguro
                </Typography>
            <Typography className={classes.description}>
                KeyPaX permite gestionar una colección de contraseñas de manera segura y remota, almacenar los nombres de usuario y claves de acceso a distintos servicios, además de otra información adicional como URLs y descripciones. Las contraseñas se organizan por categorı́as. Además, el sistema puede generar contraseñas robustas y personalizadas. 
            </Typography>
        </Box>
    )
}

export default Landing;