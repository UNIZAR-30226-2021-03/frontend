import React, { useMemo, useEffect, useState } from 'react';
import Home from './components/pages/Home';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';
import Landing from './components/pages/Landing';
import Quienes_somos from './components/pages/quienes_somos';
import NavbarPrivate from './components/navbar/NavbarPrivate';
import NavbarPublic from './components/navbar/NavbarPublic';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthContext from './context.js'
import { generatePassword } from './helpers/password.helper'
const App = () => {

  const [accessToken, setAccessToken] = useState(null)
  const [nickname, setNickname] = useState(null)

  useEffect(() => {
    const password = generatePassword(16, true, true, true, "_-.");
    console.log(password)
    if (localStorage.getItem('accessToken') !== null) {
      setAccessToken(localStorage.getItem('accessToken'))
      setNickname(localStorage.getItem('nickname'))
    }

  })

  const authContext = useMemo(() => ({
    logInToken: (data) => {
      try {
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('nickname', data.nickname)
        setAccessToken(data.accessToken)
        setNickname(data.nickname)
      } catch (err) {
      }
    },
    getAccessToken: () => {
      return accessToken
      //return accessToken
    },
    getNickname: () => {
      return nickname
      //return nickname
    },
    signOutToken: () => {
      setAccessToken(null)
      setNickname(null)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('nickname')
    }
  }), [accessToken, nickname])

  //Utilizamos switch para que renderize solo el componente con el path exacto
  return (
    <AuthContext.Provider value={authContext}>
      <Router>

        {accessToken === null
          ?
          <>
            {/** PUBLIC */}
            <NavbarPublic />
            <Switch>
              <Route path='/login' exact component={LogIn}></Route>
              <Route path='/signup' exact component={SignUp}></Route>
              <Route path='/quienes_somos' exact component={Quienes_somos}></Route>
              <Route path='/' default component={Landing}></Route>
            </Switch>
          </>
          :
          <>
            {/** PRIVATE */}
            <NavbarPrivate />
            <Switch>
              <Route path='/quienes_somos' exact component={Quienes_somos}></Route>
              <Route path='/home' default component={Home}></Route>
              <Route path='/' exact ><Redirect to={{ pathname: '/home' }} /></Route>
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
