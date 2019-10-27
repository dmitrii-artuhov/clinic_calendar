import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

// components
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Verify from './pages/Verify/Verify';
import NotFound from './pages/NotFound/NotFound';

// styles
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/forgot" component={PasswordRecovery} />
          <Route path="/verify/:verificationToken" component={Verify} />
          <Route path="/reset/:resetToken" component={PasswordReset} />
          <Route path="/404" component={NotFound} />
          
          <Redirect from="*" to="/404"  />
        </Switch>
      </Router>
    );
  }
}

export default App;
