import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Navbar from '../../components/Layout/Navbar/Navbar';
import SideDrawer from '../../components/Layout/SideDrawer/SideDrawer';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Checkout from '../Checkout/Checkout';
import { Switch, Route, Redirect } from 'react-router';
import Orders from '../Orders/Orders';
import classes from './Layout.module.css';
import Auth from '../Auth/Auth';
import { IReduxState } from '../../models/Interface';
import { connect } from 'react-redux';

interface IProps {
    isAuthenticated: boolean
}
interface IState {
    showSideDrawer: boolean
}

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
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <Auxiliary>
                <SideDrawer show={this.state.showSideDrawer} closeSideDrawerHandler={this.closeSideDrawerHandler} />
                <Navbar toggleNavbarHandler={this.toggleNavbarHandler} />
                <div className={classes.PageContainer}>
                    {routes}
                </div>
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