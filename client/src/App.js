import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// components
import Home from './components/Home/Home';

// styles
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Home} />
      </Router>
    );
  }
}

export default App;
