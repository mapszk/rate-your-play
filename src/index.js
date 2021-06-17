import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import Welcome from './pages/Welcome'
import Container from './components/Container'

const Index = () => {
  return(
    <Router>
      <Switch>
        <Route path="/welcome"><Welcome/></Route>
        <Container>
          <Route path="/" exact><App/></Route>
        </Container>
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


