import React from 'react';
import classes from './NavItems.module.css';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../context/auth-context';
import Constants from '../../../constants/constants';

interface IProps {
}

const NavItems = (props: IProps) => {

    const authContext = React.useContext(AuthContext);

    let headerLinks = [
        <li className={classes.NavItem} key="login">
            <NavLink
                to={Constants.URL.LOGIN_PAGE}
                activeClassName={classes.active}
            >
                Login
            </NavLink>
        </li>
    ];

    if (authContext.isAuthenticated) {
        headerLinks = [
            <li className={classes.NavItem} key="orders">
                <NavLink
                    to={Constants.URL.ORDERS_PAGE}
                    activeClassName={classes.active}
                >
                    Orders
                </NavLink>
            </li>,
            <li className={classes.NavItem} key="logout">
                <NavLink
                    to={Constants.URL.LOGOUT_PAGE}
                    activeClassName={classes.active}
                >
                    Logout
                </NavLink>
            </li>
        ];
    }

    return (
        <ul className={classes.NavItemContainer}>
            <li className={classes.NavItem} key="dashboard">
                <NavLink
                    to={Constants.URL.BURGER_BUILDER_PAGE}
                    exact
                    activeClassName={classes.active}
                >
                    Dashboard
                </NavLink>
            </li>
            {headerLinks}
        </ul>
    );
}

export default NavItems;