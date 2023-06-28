import React from 'react';
import Router from './shared/Router';
import GlobalStyle from './GlobalStyle';
// import { auth } from './firebase';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};

export default App;
