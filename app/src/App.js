import './App.css';
import React from 'react';
import Home from './components/pages/Home';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  //Utilizamos switch para que renderize solo el componente con el path exacto
  return (
    <Router>
      <Navbar/>
      <Switch>
          <Route path='/' exact component={Home}></Route>
        </Switch>
    </Router>
  );
}

export default App;
