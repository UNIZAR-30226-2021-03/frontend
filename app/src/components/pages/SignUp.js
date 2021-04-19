import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import sendSignUp from '../../services/SignUp.service';

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

}));

const LogIn = () => {
  const classes = useStyles();

  const [errorMail, setErrorMail] = React.useState(false);

  const [errorName, setErrorName] = React.useState(false);

  const [errorPassword, setErrorPassword] = React.useState(false);

  const [errorPasswordConfirm, setErrorPasswordConfirm] = React.useState(false);

  const [failAuthEmail, setFailAuthEmail] = React.useState(false);

  const [failAuthPassword, setFailAuthPassword] = React.useState(false);

  const [mail, setMail] = React.useState("");

  const [name, setName] = React.useState("");

  const [password, setPassword] = React.useState("");

  const [passwordConfirm, setPasswordConfirm] = React.useState("");

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
      } else if (response.status === 500) {
        console.log("--- ERROR " + response.status + ": !")
      } else if (response.status === 501) {
        console.log("--- ERROR " + response.status + ": !")
      } else if (response.status === 200) {
        // TODO signup correcto
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
              [Message]
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
                fullWidth="true"
                id="name"
                label="Nickname"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={onChangeName}
                value={name}
                error={errorName}
                helperText={errorName ? 'Enter your Nickname' : ' '}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                //className={classes.textbox}
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
                helperText={errorMail ? 'Enter a valid Email Address' : failAuthEmail ? 'Email Address Incorrect' : ' '}
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
                fullWidth="true"
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChangePassword}
                value={password}
                error={errorPassword}
                helperText={errorPassword ? 'Enter your Password' : ' '}
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
                fullWidth="true"
                name="passwordConfirm"
                label="Confirm your Password"
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
                error={errorPasswordConfirm}
                helperText={errorPasswordConfirm ? 'Password is different' : ' '}
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
    </Container>
  );
}

export default LogIn;