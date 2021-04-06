import './App.css';
import React from 'react';
import Home from './components/pages/Home';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';
import Landing from './components/pages/Landing';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  //Utilizamos switch para que renderize solo el componente con el path exacto
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={Landing}></Route>
        <Route path='/home' exact component={Home}></Route>
        <Route path='/login' exact component={LogIn}></Route>
        <Route path='/signup' exact component={SignUp}></Route>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
