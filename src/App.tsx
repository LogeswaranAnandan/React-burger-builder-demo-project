import React from 'react';
import './App.css';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import Layout from './containers/Layout/Layout';
import Spinner from './containers/UI/Spinner/Spinner';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <Auxiliary>
      <BrowserRouter>
        <Layout />
        <Spinner />
      </BrowserRouter>
    </Auxiliary>
  );
}

export default App;
