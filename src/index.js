import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

import AuthContextProvider from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute'
import Container from './components/Container';
import Home from './pages/Home';
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import Game from './pages/Game';
import Genre from './pages/Genre';
import Profile from './pages/Profile';
import SearchResult from './pages/SearchResult';
import ProfileSettings from './pages/ProfileSettings';

const Index = () => {
  return(
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/welcome"><Welcome/></Route>
          <Route path="/register"><Register/></Route>
          <Route path="/login"><Login/></Route>
          <Container>
            <PrivateRoute path="/" exact>
              <Home/>
            </PrivateRoute>
            <PrivateRoute path="/game/:gameslug">
              <Game/>
            </PrivateRoute>
            <PrivateRoute path="/category/:genre">
              <Genre />
            </PrivateRoute>
            <PrivateRoute path="/profile/:userUID">
              <Profile />
            </PrivateRoute>
            <PrivateRoute path="/search/:keyword">
              <SearchResult />
            </PrivateRoute>
            <PrivateRoute path="/settings">
              <ProfileSettings />
            </PrivateRoute>
          </Container>

        </Switch>
      </Router>
    </AuthContextProvider>
  )
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);


