import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Welcome from './pages/Welcome'
import Register from './pages/Register'

const Index = () => {
  return(
    <Router>
      <Switch>
        <Route path="/welcome"><Welcome/></Route>
        <Route path="/register"><Register/></Route>
        <Route path="/" exact><App/></Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);


