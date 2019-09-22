import React, { Component, Fragment } from 'react';

// components
import Header from './components/Header/Header';
import Advantage from "./components/Advantage/Advantage";
import Content from './components/Content/Content';
import Offer from './components/Offer/Offer';
import Footer from './components/Footer/Footer';

// styles
import './index.scss';

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Content />
        <Advantage />
        <Offer />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
