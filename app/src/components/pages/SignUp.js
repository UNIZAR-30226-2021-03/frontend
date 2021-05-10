import React, { useState} from 'react';
import { useHistory } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import sendSignUp from '../../services/SignUp.service';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  textbox: {
    padding: theme.spacing(0),
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
  form: {
    padding: theme.spacing(5),
    backgroundColor: 'rgb(255,255,255)',
    border: '2px solid rgb(232, 238, 241)',
    borderRadius: '10px',
  }

}));

const LogIn = () => {

  const history = useHistory(); // Redirection

  const classes = useStyles();

  const [errorMail, setErrorMail] = useState(false);

  const [errorName, setErrorName] = useState(false);

  const [errorPassword, setErrorPassword] = useState(false);

  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState(false);

  const [failAuthEmail, setFailAuthEmail] = useState(false);

  const [failAuthPassword, setFailAuthPassword] = useState(false);

  const [mail, setMail] = useState("");

  const [name, setName] = useState("");

  const [password, setPassword] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [openVerify, setOpenVerify] = useState(false)

  const mailRegEx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const onChangeMail = (e) => {
    setMail(e.target.value);
    if (!mailRegEx.test(e.target.value)) { // TODO alguna comprobación más
      setErrorMail(true);
    } else {
      setErrorMail(false);
    }
  }

  const onChangeName = (e) => {
    setName(e.target.value);
    if (e.target.value === "") { // TODO alguna comprobación más
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") { // TODO alguna comprobación más
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
    if (e.target.value !== passwordConfirm) {
      setErrorPasswordConfirm(true);
    } else {
      setErrorPasswordConfirm(false);
    }
  }

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
    if (e.target.value !== password) { // TODO alguna comprobación más
      setErrorPasswordConfirm(true);
    } else {
      setErrorPasswordConfirm(false);
    }
  }

  const handleSignUp = async () => {
    var noErrors = true

    if (!mailRegEx.test(mail)) { // TODO alguna comprobación más
      setErrorMail(true)
      noErrors = false
    }
    if (name === "") {
      setErrorName(true)
      noErrors = false
    }
    if (password === "") {
      setErrorPassword(true)
      noErrors = false
    }
    if (passwordConfirm !== password) {
      setErrorPasswordConfirm(true)
      noErrors = false
    }
    if (noErrors) {
      // Si no hay errores con los datos introducidos procedemos a log-in
      // TODO Puede renderizarse una animación mientras se hace la petición...

      const response = await sendSignUp(name, mail, password)
      // TODO modificar errores visuales dependiendo del código de error
      // TODO que pasa si es un codigo de erro no conocido
      if (response.status === 400) { // no se cumplen los requirements 
        console.log("--- ERROR " + response.status + ": !")
      } else if (response.status === 409) {
        console.log("--- ERROR " + response.status + ": !")
        setFailAuthEmail(true)
      } else if (response.status === 500) {
        console.log("--- ERROR " + response.status + ": !")
      } else if (response.status === 501) {
        console.log("--- ERROR " + response.status + ": !")
      } else if (response.status === 200) {
        // TODO signup correcto
        setOpenVerify(true)
        console.log('Redirecting to login...')
        history.push('/login')
      } else {
        // TODO network erorr????
      }
    }
  }
  return (
    <Container className={classes.container} component="main" maxWidth="xs" >
      <form className={classes.form} noValidate>
        <Grid container
          spacing={10}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography component="h1" variant="h3" className={classes.welcome}>
              Bienvenido!
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid containter spacing={10} >

            <Grid item xs={12}>
              <TextField
                //className={classes.textbox}
                variant="outlined"
                margin="none"
                required
                size="large"
                fullWidth={true}
                id="name"
                label="Apodo"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={onChangeName}
                value={name}
                error={errorName}
                helperText={errorName ? 'Introduce tu apodo' : ' '}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                //className={classes.textbox}
                variant="outlined"
                margin="none"
                required
                size="large"
                fullWidth={true}
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                onChange={onChangeMail}
                value={mail}
                error={errorMail || failAuthEmail}
                helperText={errorMail ? 'Introduce una dirección correcta' : failAuthEmail ? 'Ya existe un usuario con esta dirección' : ' '}
              // TODO email address is already in use
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                //className={classes.textbox}
                variant="outlined"
                margin="none"
                required
                size="large"
                fullWidth={true}
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                onChange={onChangePassword}
                value={password}
                error={errorPassword}
                helperText={errorPassword ? 'Introduce tu contraseña' : ' '}
              // TODO crear estado que en onChangePassword se modifique indicando que le falta a la contraseña (longitud, números, demás) Mirar si existe módulo que lo haga
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                //className={classes.textbox}
                variant="outlined"
                margin="none"
                required
                size="large"
                fullWidth={true}
                name="passwordConfirm"
                label="Confirma tu contraseña"
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
                error={errorPasswordConfirm}
                helperText={errorPasswordConfirm ? 'Contraseñas son diferentes' : ' '}
              />
            </Grid>

          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.submit}
            fullWidth
            onClick={handleSignUp}
          // TODO submit????
          //type="submit"
          >
            Sign up
            </Button>
        </Grid>
      </form>

      <Dialog
        open={openVerify}
        onClose={() => { setOpenVerify(false) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Verificar correo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se ha enviado un correo para verificar tu identidad. Se necesita la verificación antes de Iniciar Sesión.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpenVerify(false) }} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}

export default LogIn;