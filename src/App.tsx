import React from 'react';
import './App.css';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './containers/Layout/Layout';
import Spinner from './containers/UI/Spinner/Spinner';

const App = () => {
  return (
    <Auxiliary>
      <Layout>
        <BurgerBuilder></BurgerBuilder>
      </Layout>
      <Spinner />
    </Auxiliary>
  );
}

export default App;
