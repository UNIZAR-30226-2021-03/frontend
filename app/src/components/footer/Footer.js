//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sticky-footer/StickyFooter.js
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: 'rgb(30, 61, 88)',
    color: 'rgb(232, 238, 241)'
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <Container className={classes.container} component="main" maxWidth="xl">
      <form className={classes.form} noValidate></form>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Grid container
            spacing={0}
            direction="column"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12}>
            <Typography variant="h6">
              Conócenos
              </Typography>
            </Grid>
            <Grid item xs={12}>
              Integrantes
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
            <Typography variant="h6">
              Contáctanos
              </Typography>
            </Grid>
            <Grid item xs={12}>
              barbarosoft@gmail.com
          </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container
            spacing={0}
            direction="column"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item xs={12}>
            <Typography variant="h6">
              Cuéntanos tu experiencia
              </Typography>
            </Grid>
            <Grid item xs={12}>
              Encuesta de calidad
            </Grid>
          </Grid>
        </Grid>
        <Grid container
          spacing={0}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h6">
              Bárbaros Software S.A. 2021
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}