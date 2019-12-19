import React from 'react';
import './App.css';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import Layout from './containers/Layout/Layout';
import Spinner from './containers/UI/Spinner/Spinner';
import { BrowserRouter } from 'react-router-dom';
import AuthActions from './redux/action-creators/AuthActions';
import { connect } from 'react-redux';

interface IProps {
  onLoadAuthTokenCheck: () => void
}

const App = (props: IProps) => {
  props.onLoadAuthTokenCheck();
  return (
    <Auxiliary>
      <BrowserRouter>
        <Layout />
        <Spinner />
      </BrowserRouter>
    </Auxiliary>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadAuthTokenCheck: () => dispatch(AuthActions.onLoadTokenCheck())
  }
}

export default connect(null, mapDispatchToProps)(App);
