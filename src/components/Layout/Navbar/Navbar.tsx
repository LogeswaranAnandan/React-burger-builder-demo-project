import React from 'react';
import classes from './Navbar.module.css';
import NavItems from '../NavItems/NavItems';
import Logo from '../Logo/Logo';

interface IProps {
    toggleNavbarHandler(): void
}

const Navbar = (props: IProps) => {
    return (
        <header className={classes.Navbar}>
            <div className={classes.DrawerToggle} onClick={props.toggleNavbarHandler}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavItems/>
            </nav>
        </header>
    );
}

export default Navbar;