import './App.css';
import React from 'react';
import Home from './components/pages/Home';
import LogIn from './components/pages/LogIn';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  //Utilizamos switch para que renderize solo el componente con el path exacto
  return (
    <Router>
      <Navbar/>
      <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/log-in' exact component={LogIn}></Route>
        </Switch>
        <Footer/>
    </Router>
  );
}

export default App;
