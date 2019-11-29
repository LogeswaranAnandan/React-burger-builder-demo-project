import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Navbar from '../../components/Layout/Navbar/Navbar';
import SideDrawer from '../../components/Layout/SideDrawer/SideDrawer';

interface IState {
    showSideDrawer: boolean
}

class Layout extends Component<{}, IState> {

    state = {
        showSideDrawer: false
    };

    closeSideDrawerHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleNavbarHandler = () => {
        const isSideDrawerShown = this.state.showSideDrawer;
        this.setState({showSideDrawer: !isSideDrawerShown});
    }

    render() {
        return (
            <Auxiliary>
                <SideDrawer show={this.state.showSideDrawer} closeSideDrawerHandler={this.closeSideDrawerHandler} />
                <Navbar toggleNavbarHandler={this.toggleNavbarHandler} />
                <div>{this.props.children}</div>
            </Auxiliary>
        )
    }
}

export default Layout;