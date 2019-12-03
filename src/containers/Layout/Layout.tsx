import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Navbar from '../../components/Layout/Navbar/Navbar';
import SideDrawer from '../../components/Layout/SideDrawer/SideDrawer';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Checkout from '../Checkout/Checkout';
import { Switch, Route } from 'react-router';
import Orders from '../Orders/Orders';
import classes from './Layout.module.css';

interface IState {
    showSideDrawer: boolean
}

class Layout extends Component<{}, IState> {

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
        return (
            <Auxiliary>
                <SideDrawer show={this.state.showSideDrawer} closeSideDrawerHandler={this.closeSideDrawerHandler} />
                <Navbar toggleNavbarHandler={this.toggleNavbarHandler} />
                <div className={classes.PageContainer}>
                    <Switch>
                        <Route path="/" exact component={BurgerBuilder} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/orders" component={Orders} />
                    </Switch>
                </div>
            </Auxiliary>
        )
    }
}

export default Layout;