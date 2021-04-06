//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sticky-footer/StickyFooter.js
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {DataGrid} from '@material-ui/data-grid';

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
  root: {
    display: 'flex',
    flexDirection: 'column',
    //minHeight: '0vh',
    position: 'fixed',
    padding: '0px',
    width: '100%',
    bottom: '0'
  },
  main: {
    //marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: 'rgb(30, 61, 88)',
    color: 'rgb(232, 238, 241)'
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container component="main" className={classes.main} maxWidth="sm">
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" align="right">My sticky footer can be found here.</Typography>
          <DataGrid
            columns={[
              { field: 'id', hide: true },
              {
                field: 'username',
                headerName: 'Username',
                description:
                  'The identification used by the person with access to the online service.',
              },
              { field: 'age', headerName: 'Age' },
            ]}
          />
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}