import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import ButtonCustom from '../button/ButtonCustom.js';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(10),
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    padding: theme.spacing(3),
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  description: {
    padding: theme.spacing(2),
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

}));

const LogIn = () => {
  const classes = useStyles();

  const [errorMail, setErrorMail] = React.useState(false);

  const [errorPassword, setErrorPassword] = React.useState(false);

  const [failAuth, setFailAuth] = React.useState(false);

  const [mail, setMail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const onChangeMail = (e) => {
    setMail(e.target.value); //Valor introducido en el text field
    if (!emailRegEx.test(e.target.value)) { //Es un email?
      setErrorMail(true);
    } else {
      setErrorMail(false);//Color rojo de error
    }
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") { //No se permite contraseña vacía
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  }

  const handleLogin = () => { //Función que se ejecuta cuando click login
    var noErrors = true;
    if (!emailRegEx.test(mail)) {
      setErrorMail(true);
      noErrors = false;
    }
    if (password === "") {
      setErrorPassword(true);
      noErrors = false;
    }
    if (noErrors) { //Si no hay errores con los datos introducidos procedemos a log-in
      //Puede renderizarse una animación mientras se hace la petición...
      setFailAuth(true); //Pongo failauth a true como si no se hubiese podido autenticar
    }
  }

  return (
    <Container className={classes.container} component="main" maxWidth="md" >

      <form className={classes.form} noValidate>

        <Grid container
          spacing={0}
          direction="column"
          justify="center"
          alignItems="strech"
        >

          <Grid container
            spacing={3}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography component="h1" variant="h3" className={classes.welcome}>
                Nice to meet you!
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid containter spacing={5}
              direction="column"
              justify="center"
              alignItems="center"
            >

              <Grid item xs={12}>
                <Typography variant="h5" className={classes.description} >
                  Here I will explain how to create your account (if required)
                </Typography>
              </Grid>

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
                  error={errorMail || failAuth}
                  helperText={errorMail ? 'Enter your Email Address' : failAuth ? 'Email Address or Password Incorrect' : ' '}
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
                  error={errorPassword || failAuth}
                  helperText={errorMail ? 'Enter your Password' : failAuth ? 'Email Address or Password Incorrect' : ' '}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container
            spacing={2}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Button
                fullWidth
                buttonSize='btn--large'
                onClick={handleLogin}
                path="" // to??????
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

        </Grid>
      </form>
    </Container>
  );
}

export default LogIn;