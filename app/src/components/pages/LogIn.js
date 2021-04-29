import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import sendLogIn from '../../services/LogIn.service.js';
import send2FA from '../../services/2FA.service.js';
import {AuthContext} from '../../context'
import { useHistory } from "react-router-dom"
//import { Redirect } from 'react-router';

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

  const history = useHistory(); // Redirection

  const { logInToken } = useContext(AuthContext)

  const classes = useStyles();

  const [errorMail, setErrorMail] = React.useState(false);

  const [errorPassword, setErrorPassword] = React.useState(false);

  const [failAuthEmail, setFailAuthEmail] = React.useState(false);

  const [failAuthPassword, setFailAuthPassword] = React.useState(false);

  const [failAuth2FA, setFailAuth2FA] = React.useState(false);

  const [mail, setMail] = React.useState("");

  const [password, setPassword] = React.useState("");

  const [open2FA, setOpen2FA] = React.useState(false);

  const [code2FA, setCode2FA] = React.useState("");

  const [loginToken, setLoginToken] = React.useState("aa");

  const mailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const onChangeMail = (e) => {
    setMail(e.target.value);
    if (!mailRegEx.test(e.target.value)) { // TODO alguna comprobación más ?
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

  const onChangeCode2FA = (e) => { // TODO ERROR: que pasa si no se introduce codigo de 6 cifras
    setFailAuth2FA(false)
    setCode2FA(e.target.value);
  }

  const handleLogIn = async () => {
    var noErrors = true
    if (!mailRegEx.test(mail)) { // TODO alguna comprobación más
      setErrorMail(true)
      noErrors = false
    }
    if (password === "") {
      setErrorPassword(true)
      noErrors = false
    }
    if (noErrors) {
      // Si no hay errores con los datos introducidos procedemos a log-in
      // TODO Puede renderizarse una animación mientras se hace la petición...
      // TODO realizar petición
      const response = await sendLogIn(mail, password)
      // TODO modificar errores visuales dependiendo del código de error
      // TODO que pasa si es un codigo de erro no conocido
      if (response.status === 400) { // no se cumplen los requirements 
        console.log("--- ERROR " + response.status + ": !")
        // TODO informar al usuario del error
      } else if (response.status === 401) {
        console.log("--- ERROR " + response.status + ": !")
        // TODO informar al usuario del error
        setFailAuthPassword(true)
      } else if (response.status === 404) {
        console.log("--- ERROR " + response.status + ": !")
        // TODO informar al usuario del error
        setFailAuthEmail(true)
      } else if (response.status === 500) {
        console.log("--- ERROR " + response.status + ": !")
        // TODO informar al usuario del error
      } else if (response.status === 501) {
        console.log("--- ERROR " + response.status + ": !")
        // TODO informar al usuario del error
      } else if (response.status === 200) {
        console.log()
        // TODO sin conexion se sigue abriendo el dialog, cambiar codigo de errores
        setLoginToken(response.data._2faToken)
        setOpen2FA(true)
      } else {
        // TODO error en network ??????
      }
    }
  }

  const handle2FA = async () => {
    // TODO implementar numero de intentos para introducir correctamente el codigo (por ahora infinitas)
    console.log(loginToken)

    const response = await send2FA(loginToken, code2FA)
    if (response.status === 401) {
      console.log("--- ERROR " + response.status + ": !")
      // TODO informar al usuario del error
      setFailAuth2FA(true)
    } else if (response.status === 200) {
      logInToken(response.data.accessToken)
      setOpen2FA(false)
      console.log('Redirecting to home...')
      history.push('/home')
    } else {
      // TODO network error
    }
    setCode2FA("")
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
          <Grid containter="true" >
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="none"
                required
                size="medium"
                fullWidth={true}
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={onChangeMail}
                value={mail}
                error={errorMail || failAuthEmail}
                helperText={errorMail ? 'Introduce una dirección válida' : failAuthEmail ? 'El usuario no existe o no esta verificado' : ' '}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                margin="none"
                required
                size="medium"
                fullWidth={true}
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChangePassword}
                value={password}
                error={errorPassword || failAuthPassword}
                helperText={errorMail ? 'Intorduce la contraseña' : failAuthPassword ? 'La contraseña es incorrecta' : ' '}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleLogIn}
            className={classes.submit}
            fullWidth={true}
          //type="submit"
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

      <Dialog open={open2FA} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Coódigo de Verificación 2FA</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, introduzca el código de verificación enviado a: {mail}
          </DialogContentText>
          <TextField
            autoFocus
            margin="none"
            label="Código"
            type="password"
            fullWidth={true}
            required
            size="medium"
            name="code2FA"
            autoComplete="off"
            //id="code2FA"
            onChange={onChangeCode2FA}
            value={code2FA}
            error={failAuth2FA}
            helperText={failAuth2FA ? 'Código de verificación incorrecto' : ' '}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handle2FA} color="primary" fullWidth={true}>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

    </Container >
  );
}

export default LogIn;