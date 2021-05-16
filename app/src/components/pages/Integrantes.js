import { Box, Tab } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import keyImage from '../../resources/key-1315566.jpg';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    integrantesText: {
        textAlign: 'center',
        position: 'fixed',
        top: '15%',
        left: '50%',
        right: '50%',
        width: '1500px',
        transform: 'translate(-50%, -50%)',
        flexGrow: 1,
    },

    title: {
        fontSize: '50px',
        textAlign: 'center',
        paddingTop: '15px',
    },
    description: {
        fontSize: '30px',
        textAlign: 'justify',
        position: 'fixed',
    },
}));

const Integrantes = () => {

    const classes = useStyles();

    return (
        <Box component="div" className={classes.integrantesText}>
            <Box component="div" className={classes.title}>
            Quiénes somos
            </Box>
            <Box component="div" className={classes.description}>
            Bárbaros Software S.A. cuenta con tres años de experiencia en el mercado. 
            Destacamos nuestras habilidades en el mundo empresarial que nos avala como una empresa referente en el sector.
            La empresa se caracteriza por una filosofía basada en el trabajo coordinado en grupo, con especialistas en distintos campos del sector que unificados forman un equipo de trabajo altamente sofisticado.
            Entre los servicios y capacidades que nuestros clientes han podido destacar de nosotros están: <br/> <br/>
            -Experiencia en desarrollo móvil en dispositivos Android.<br/>
            -Veteranía en el framework de JavaScript React para Web y Móvil.<br/>
            -Destreza en el entorno de ejecución NodeJS con el framework Express.<br/>
            -Práctica en Bases de Datos relacionales (Oracle, Postgresql, MySql...).<br/>
            -Conocimiento en Bases de Datos no relacionales (MongoDB). <br/>
            -Alto uso de diferentes lenguajes de programación (Java, JavaScript, C, C++, GoLang).<br/>
            -Estudio de metodología de despliegue de Proyectos con Docker y Kubernetes. <br/>
            -Maestría en el uso de IaaS (Microsoft Azure, Amazon AWS).<br/>
            -Prácticas de testing con PostMan.<br/>
            -Altos conocimientos en gestión de versiones a través del Software Git.<br/>
            </Box>
        </Box>
    )
}

export default Integrantes;