//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sticky-footer/StickyFooter.js
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Integrantes from '../pages/Integrantes';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: 'rgb(30, 61, 88)',
    color: 'rgb(232, 238, 241)'
  },
  submit: {
    textTransform: "none",
    fontSize: '20px',
    padding: '8px 20px',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: 'rgb(30,61,88)',
    transition: 'all 0.3s ease-out',
    border: '1px solid rgb(30,61,88)',
    '&:hover': {
      backgroundColor: 'rgb(5, 125, 205)',
      color: 'rgb(232, 238, 241)',
      transition: 'all 0.3s ease-out',
      border: '1px solid rgb(5, 125, 205)',
    }
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
             {/* <Button
                onClick={Integrantes} //Falta conectar correctamente con la pantalla de integrantes
                className={classes.submit}
                fullWidth={true}
                //type="submit"
             >
                Integrantes
              </Button>*/}
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
            -------------------------
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6">
            Bárbaros Software S.A. 2021
              </Typography>
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
                Contáctanos
              </Typography>
            </Grid>
            <Grid item xs={12}>
                barbarosoft@gmail.com
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}