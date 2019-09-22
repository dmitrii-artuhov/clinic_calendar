import React, { Component, Fragment } from 'react';

// components
import Header from './components/Header/Header';
import Content from './components/Content/Content';

// styles
import './index.scss';

export class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Content />
      </Fragment>
    );
  }
}

export default App;
