import './App.css';
import React, { useMemo, useEffect, useState } from 'react';
import Home from './components/pages/Home';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';
import Landing from './components/pages/Landing';
import NavbarPrivate from './components/navbar/NavbarPrivate';
import NavbarPublic from './components/navbar/NavbarPublic';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthContext from './context'
import {generatePassword} from './helpers/password.helper'
const App = () => {

  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    const password = generatePassword(16,true,true,true,"_-.");
    console.log(password)
    setAccessToken(localStorage.getItem('accessToken'))
  }, [])

  const authContext = useMemo(() => ({
    logInToken: (accessToken) => {
      // TODO se puede guardar nombre...
      try {
        localStorage.setItem('accessToken', accessToken)
        setAccessToken(accessToken)
      } catch (err) {
        console.log(err)
      }
    },
    getAccessToken: () => {
      return accessToken
    },
    signOutToken: () => {
      setAccessToken(null)
      localStorage.removeItem('accessToken')
    }
  }), [accessToken])

  //Utilizamos switch para que renderize solo el componente con el path exacto
  return (
    <AuthContext.Provider value={authContext}>
      <Router>

        {accessToken === null
          ?
          <>
            <NavbarPublic />
            <Switch>
              <Route path='/login' exact component={LogIn}></Route>
              <Route path='/signup' exact component={SignUp}></Route>
              <Route path='/' default component={Landing}></Route>
            </Switch>
          </>
          :
          <>
            <NavbarPrivate />
            <Switch>
              <Route path='/home' default component={Home}></Route>
            </Switch>

          </>
        }
        {/** // TODO CREAR UNA RUTA CUNDO NO EXISTA Routa por defecto sin "exact" */}
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
