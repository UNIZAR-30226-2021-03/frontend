import { Box } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import keyImage from '../../resources/key-1315566.jpg';


const useStyles = makeStyles((theme) => ({
    integrantesText: {
        position: 'fixed',
        top: '15%',
        left: '50%',
        right: '50%',
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
        position: 'fixed',
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
        //<Container component='div' maxWidth='xl' className='container'>
            <Box component="div" className={classes.integrantesText}>
                <Box component="div" className={classes.title}>
                Quiénes somos
                </Box>
                <Box component="div" className={classes.description}>
                Bárbaros Software S.A. cuenta con tres años de experiencia en el mercado. 
                Destacamos nuestras habilidades en el mundo empresarial que nos avala como una empresa referente en el sector.
                La empresa se caracteriza por una filosofía basada en el trabajo coordinado en grupo, con especialistas en distintos campos del sector que unificados forman un equipo de trabajo altamente sofisticado.
                Los servicios y capacidades que nuestros clientes han podido destacar entre los más importantes son: <br/> <br/>
                Poner la experiencia...
                </Box>
            </Box>
       //</Container>

    )
}

export default Integrantes;