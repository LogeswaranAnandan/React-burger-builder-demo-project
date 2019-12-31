import React from 'react';
import './App.css';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import Layout from './containers/Layout/Layout';
import Spinner from './containers/UI/Spinner/Spinner';
import { BrowserRouter } from 'react-router-dom';
import AuthActions from './redux/action-creators/AuthActions';
import { connect } from 'react-redux';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  onLoadAuthTokenCheck: () => void
}

const App = (props: IProps) => {
  props.onLoadAuthTokenCheck();

  toast.configure({
    newestOnTop: true,
    hideProgressBar: true,
    pauseOnFocusLoss: false,
    transition: Slide
  });

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
