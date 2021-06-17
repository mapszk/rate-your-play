import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

import AuthContextProvider from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute'
import App from './pages/App';
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import FirstSteps from './pages/FirstSteps';

const Index = () => {
  return(
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/welcome"><Welcome/></Route>
          <Route path="/register"><Register/></Route>
          <Route path="/login"><Login/></Route>
          <PrivateRoute to="/" exact>
            <App/>
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthContextProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);


