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

        // TODO el container este se pone por encima de todo,
        // Para mantener imagen de fondo, arreglar
        //<Container component='div' maxWidth='xl' className='container'>
            <Box component="div" className={classes.landingText}>
                <Typography className={classes.title}>
                    KeyPaX
                </Typography>
                <Typography className={classes.subtitle}>
                    Gestor de contraseñas seguro
                </Typography>
                <Typography className={classes.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Molestie nunc non blandit massa. Mattis molestie a iaculis at erat. Dictum varius duis at consectetur lorem donec.
                </Typography>
            </Box>
        //</Container>

    )
}

export default Landing;