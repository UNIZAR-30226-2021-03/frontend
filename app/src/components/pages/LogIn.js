import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Button } from '../Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

//No tiene implementado el control de usuarios ya loggeados
//Para usar componentes de matrrial ui importante => 
//$ npm install @material-ui/core
//$ npm install @material-ui/icons
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    margin: 'auto',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LogIn = () =>  {
  const classes = useStyles();

  const [errorMail, setErrorMail] = React.useState(false);

  const [errorPassword, setErrorPassword] = React.useState(false);

  const [failAuth, setFailAuth] = React.useState(false);

  const [mail, setMail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const emailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const onChangeMail = (e) => {
    setMail(e.target.value); //Valor introducido en el text field
    if (!emailRegEx.test(e.target.value)){ //Es un email?
      setErrorMail(true);
    }else{
      setErrorMail(false);//Color rojo de error
    } 
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === ""){ //No se permite contraseña vacía
      setErrorPassword(true);
    }else{
      setErrorPassword(false);
    }
  }

  const handleLogin = () => { //Función que se ejecuta cuando click login
    var noErrors = true;
    if(!emailRegEx.test(mail)){
      setErrorMail(true);
      noErrors= false;
    }
    if(password === ""){
      setErrorPassword(true);
      noErrors = false;
    }
    if (noErrors){ //Si no hay errores con los datos introducidos procedemos a log-in
      //Puede renderizarse una animación mientras se hace la petición...
      setFailAuth(true); //Pongo failauth a true como si no se hubiese podido autenticar
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MeetingRoomRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChangeMail}
              value={mail}
              error={errorMail || failAuth} 
              helperText={errorMail ? 'Introduzca su email' : failAuth ? 'Email o contraseña incorrectos' : ' ' }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangePassword}
              value={password}
              error={errorPassword || failAuth}
              helperText={errorMail ? 'Introduzca su contraseña' : failAuth ? 'Email o contraseña incorrectos' : ' ' }
            />
            <Button className={classes.submit}
              buttonSize='btn--large'
              onClick={handleLogin}
              to=""
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/recuperacion" variant="body2">
                  Forgot password? (puede hacerse...)
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
  );
}

export default LogIn;