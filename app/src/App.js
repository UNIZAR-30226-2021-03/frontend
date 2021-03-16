import './App.css';
import React from 'react'
import Home from './components/home'
import Prueba from './components/prueba1'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const App = () => {
  return (
    <Router>
        <Route path='/' exact component={Home}></Route>
        <Route path='/abc' exact component={Prueba}></Route>
    </Router>
  );
}

export default App;
