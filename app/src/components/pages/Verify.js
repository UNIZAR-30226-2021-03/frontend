import { Box, Container } from '@material-ui/core';
import React from 'react';
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
}));

const Verify = () => {

    const classes = useStyles();

    return (
        <Container component='div' maxWidth='xl' className={classes.container}>
            <Box component="div" className={classes.landingText}>
                <Box component="div" className={classes.title}>
                    Verificación completada
                </Box>
                <Box component="div" className={classes.description}>
                    La verificación del correo electrónico se ha realizado correctamente
                </Box>
            </Box>
            {/*
            */}
        </Container>

    )
}

export default Verify;