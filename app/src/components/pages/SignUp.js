import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonCustom from '../button/ButtonCustom.js';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    padding: '12px 26px',
    fontSize: '20px',
    padding: '8px 20px',
    borderRadius: '3px',
    outline: 'none',
    border: 'none',
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

  const [errorName, setErrorName] = React.useState(false);

  const [errorPassword, setErrorPassword] = React.useState(false);

  const [failAuth, setFailAuth] = React.useState(false);

  const [mail, setMail] = React.useState("");

  const [name, setName] = React.useState("");

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

  const onChangeName = (e) => {
    setName(e.target.value); //Valor introducido en el text field
    if (e.target.value === "") {
      setErrorName(true);
    } else {
      setErrorName(false);
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
              [Message]
              </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid containter spacing={3} >

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="none"
                required // TODO required???
                size="large"
                fullWidth="true"
                id="name"
                label="Nickname"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={onChangeMail}
                value={name}
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
        <Grid item xs={12}>
          <Button
            className={classes.submit}
            fullWidth
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