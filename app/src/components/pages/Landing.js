import { Box, Container, CssBaseline } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
        paddingTop: '15px',
    },
    description: {
        fontSize: '30px',
        textAlign: 'center',
    },
    /*
    back: {
        backgroundColor: 'none',
        backgroundImage: keyImage,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    }
    */
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

        <Container component='main' maxWidth='xl' /*style={{ divStyle }}*/>
            <Box component="div" className={classes.landingText}>
                <Box component="div" className={classes.title}>
                    KeyPaX
                </Box>
                <Box component="div" className={classes.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Molestie nunc non blandit massa. Mattis molestie a iaculis at erat. Dictum varius duis at consectetur lorem donec.
                </Box>
            </Box>
        </Container>
    )
}

export default Landing;