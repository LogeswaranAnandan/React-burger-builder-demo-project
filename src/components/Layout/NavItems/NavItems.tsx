import React from 'react';
import classes from './NavItems.module.css';
import { NavLink } from 'react-router-dom';

const NavItems = () => {
    return (
        <ul className={classes.NavItemContainer}>
            <li className={classes.NavItem}>
                <NavLink
                    to="/"
                    exact
                    activeClassName={classes.active}
                >
                    Dashboard
                </NavLink>
            </li>
            <li className={classes.NavItem}>
                <NavLink
                    to="/orders"
                    activeClassName={classes.active}
                >
                    Orders
                </NavLink>
            </li>
        </ul>
    );
}

export default NavItems;