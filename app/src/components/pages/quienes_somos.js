import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import keyImage from '../../resources/key-1315566.jpg';

const useStyles = makeStyles((theme) => ({
    quienes_somosText: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '1000px',
        transform: 'translate(-50%, -50%)',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
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

const Quienes_somos = () => {

    const classes = useStyles();

    return (
        <Box component="div" className={classes.quienes_somosText}>
            <Typography className={classes.subtitle}>
                Quiénes somos
            </Typography>
            <Typography className={classes.description}>
                Bárbaros Software S.A. cuenta con tres años de experiencia en el mercado. 
                Destacamos nuestras habilidades en el mundo empresarial que nos avala como una empresa referente en el sector.
                La empresa se caracteriza por una filosofía basada en el trabajo coordinado en grupo, con especialistas en distintos campos del sector que unificados forman un equipo de trabajo altamente sofisticado.
            </Typography>
        </Box>
    )
}

export default Quienes_somos;