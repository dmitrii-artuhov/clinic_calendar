import React, { Component, Fragment } from 'react';

// components
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Offer from './components/Offer/Offer';

// styles
import './index.scss';

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Content />
        <Offer />
      </Fragment>
    );
  }
}

export default App;
