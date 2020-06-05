import React, { Component, Suspense } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Navbar from '../../components/Layout/Navbar/Navbar';
import SideDrawer from '../../components/Layout/SideDrawer/SideDrawer';
import { Switch, Route, Redirect } from 'react-router';
import classes from './Layout.module.css';
import Auth from '../Auth/Auth';
import { IReduxState } from '../../models/Interface';
import { connect } from 'react-redux';
import AuthContext from '../../context/auth-context';
import Logout from '../Auth/Logout/Logout';
import Constants from '../../constants/constants';
import Spinner from '../UI/Spinner/Spinner';

interface IProps {
    isAuthenticated: boolean
}
interface IState {
    showSideDrawer: boolean
}

// const BurgerBuilder = React.lazy(() => import('../BurgerBuilder/BurgerBuilder'));
const BurgerBuilder = React.lazy(() => import('../../functional-container/burger-builder'));
const Checkout = React.lazy(() => import('../Checkout/Checkout'));
const Orders = React.lazy(() => import('../Orders/Orders'));

class Layout extends Component<IProps, IState> {

    state = {
        showSideDrawer: false
    };

    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    toggleNavbarHandler = () => {
        const isSideDrawerShown = this.state.showSideDrawer;
        this.setState({ showSideDrawer: !isSideDrawerShown });
    }

    render() {
        let routes = (
            <Switch>
                <Route path={Constants.URL.LOGIN_PAGE} component={Auth} />
                <Route path={Constants.URL.BURGER_BUILDER_PAGE} exact component={BurgerBuilder} />
                <Redirect to={Constants.URL.LANDING_PAGE} />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path={Constants.URL.CHECKOUT_PAGE} component={Checkout} />
                    <Route path={Constants.URL.ORDERS_PAGE} component={Orders} />
                    <Route path={Constants.URL.LOGOUT_PAGE} component={Logout} />
                    <Route path={Constants.URL.BURGER_BUILDER_PAGE} component={BurgerBuilder} />
                    <Redirect to={Constants.URL.LANDING_PAGE} />
                </Switch>
            );
        }

        return (
            <Auxiliary>
                <AuthContext.Provider value={{ isAuthenticated: this.props.isAuthenticated }}>
                    <SideDrawer show={this.state.showSideDrawer} closeSideDrawerHandler={this.closeSideDrawerHandler} />
                    <Navbar toggleNavbarHandler={this.toggleNavbarHandler} />
                    <div className={classes.PageContainer}>
                        <Suspense fallback={<Spinner showSpinnerAsFallback={true} />}>
                            {routes}
                        </Suspense>
                    </div>
                </AuthContext.Provider>
            </Auxiliary>
        )
    }
}

const mapStateToProps = (reduxState: IReduxState) => {
    return {
        isAuthenticated: reduxState.authState.isAuthenticated
    }
}

export default connect(mapStateToProps)(Layout);