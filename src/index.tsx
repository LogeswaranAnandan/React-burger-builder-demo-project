import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import burgerBuilderReducer from './redux/reducer/BurgerBuilderReducer';
import orderReducer from './redux/reducer/OrderReducer'
import authReducer from './redux/reducer/AuthReducer';
import thunk from 'redux-thunk';


const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const rootReducer = combineReducers({
    burgerBuilderState: burgerBuilderReducer,
    ordersState: orderReducer,
    authState: authReducer
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const rootComponent = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(rootComponent, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
