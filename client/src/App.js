import React, { Component, Fragment } from 'react';

// components
import Header from './components/Header/Header';
import Advantage from "./components/Advantage/Advantage";

// styles
import './index.scss';

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Advantage />
      </Fragment>
    );
  }
}

export default App;
