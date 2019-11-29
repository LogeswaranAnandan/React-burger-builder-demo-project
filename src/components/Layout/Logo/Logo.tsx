import React from 'react';
import logoImage from '../../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = () => {
    return (
        <img src={logoImage} alt="logo" className={classes.LogoImage} />
    );
};

export default Logo;