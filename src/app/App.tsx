import React, {Fragment } from 'react';

import Header from '../components/header';
import Main from '../pages/main';

import './app.scss';



function App() {
  return (
    <Fragment>
      <Header/>
      <Main/>
    </Fragment>
  );
}

export default App;
