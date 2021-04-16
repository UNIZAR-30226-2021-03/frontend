//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sticky-footer/StickyFooter.js
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

function Copyright() {
  //textAlign();
  return (
    <Typography variant="body2" color='white' align="right">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Barbaros Software
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    <Container className={classes.container} component="main" maxWidht="xs">
      <form className={classes.form} noValidate></form>
      <Grid container
          spacing={0}
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            hola11
          </Grid>
          <Grid item xs={12}>
            hola21
          </Grid>
          <Grid item xs={12}>
            hola31
          </Grid>
      </Grid>
      <Grid container
          spacing={0}
          direction="column"
          justify="center"
          alignItems="center"
        >
        <Grid item xs={12}>
            hola12
          </Grid>
          <Grid item xs={12}>
            hola22
          </Grid>
          <Grid item xs={12}>
            hola32
          </Grid>
      </Grid>
      <Grid container
          spacing={0}
          direction="column"
          justify="flex-end"
          alignItems="flex-end"
        >
        <Grid item xs={12}>
            hola13
          </Grid>
          <Grid item xs={12}>
            hola23
          </Grid>
          <Grid item xs={12}>
            hola24
          </Grid>
      </Grid>
      <Grid container
          spacing={0}
          direction="column"
          justify="flex-end"
          alignItems="flex-end"
        >
          <Grid item xs={12}>
            Bárbaros Software S.A. 2021
          </Grid>
      </Grid>
    </Container>
  );
}