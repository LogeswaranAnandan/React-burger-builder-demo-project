import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Navbar from '../../components/Layout/Navbar/Navbar';
import SideDrawer from '../../components/Layout/SideDrawer/SideDrawer';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Checkout from '../Checkout/Checkout';
import { Switch, Route } from 'react-router';

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
                <div>
                    <Switch>
                        <Route path="/" exact component={BurgerBuilder} />
                        <Route path="/checkout" component={Checkout} />
                    </Switch>
                </div>
            </Auxiliary>
        )
    }
}

export default Layout;