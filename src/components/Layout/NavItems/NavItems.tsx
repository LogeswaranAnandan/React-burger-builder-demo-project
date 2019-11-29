import React from 'react';
import classes from './NavItems.module.css';

const NavItems = () => {
    const navHeaders = ['Dashboard', 'Summary'];
    let navItems: any[] = [];

    navHeaders.forEach((nav) => {
        navItems.push((
            <li className={classes.NavItem} key={nav}>
                <a href="/">{nav}</a>
            </li>
        ))
    });

    return (
        <ul className={classes.NavItemContainer}>
            {navItems}
        </ul>
    );
}

export default NavItems;