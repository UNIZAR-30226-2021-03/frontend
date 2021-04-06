import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import login from '../../services/Login.service.js';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    padding: theme.spacing(5),
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

const LogIn = () => {
  const classes = useStyles();

  const [errorMail, setErrorMail] = React.useState(false);

  const [errorPassword, setErrorPassword] = React.useState(false);

  const [failAuthEmail, setFailAuthEmail] = React.useState(false);

  const [failAuthPassword, setFailAuthPassword] = React.useState(false);

  const [mail, setMail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const onChangeMail = (e) => {
    setMail(e.target.value);
    if (!emailRegEx.test(e.target.value)) { // TODO alguna comprobación más ?
      setErrorMail(true);
    } else {
      setErrorMail(false);
    }
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") { // TODO alguna comprobación más ?
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  }

  const handleLogin = () => {
    if(errorPassword || errorMail) { // TODO alguna comprobación más ?      
      console.log("ERROR")
    } else {
      // Si no hay errores con los datos introducidos procedemos a log-in
      // TODO Puede renderizarse una animación mientras se hace la petición...
      // TODO realizar petición
      console.log("HOLA HOAL")
      login()
      .then( res => {
        console.log(res)
      })
      .catch( err => {
        console.log("Errrorrrrr")
      })
      // TODO comprobar errores de peticion
    }
  }

  return (
    <Container className={classes.container} component="main" maxWidth="xs" >

      <form className={classes.form} noValidate>

        <Grid container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography component="h1" variant="h3" className={classes.welcome}>
              Welcome!
              </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid containter spacing={3} >
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="none"
                required
                size="large"
                fullWidth="true"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={onChangeMail}
                value={mail}
                error={errorMail || failAuthEmail}
                helperText={errorMail ? 'Enter a valid Email Address' : failAuthEmail ? 'Email Address is Incorrect' : ' '}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="none"
                required
                size="large"
                fullWidth="true"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChangePassword}
                value={password}
                error={errorPassword || failAuthPassword}
                helperText={errorMail ? 'Enter your Password' : failAuthPassword ? 'Password is Incorrect' : ' '}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleLogin}
            className={classes.submit}
            fullWidth="true"
            type="submit"
          >
            Log in
            </Button>
        </Grid>

        <Grid item xs={12}>
          <Link
            href="/signup"
            variant="body2"
            className={classes.reminder}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </form>
    </Container>
  );
}

export default LogIn;