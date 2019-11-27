import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.module.css';

const Layout: React.StatelessComponent<any> = (props: any) => {
    console.log('classes', classes);
    return (
        <Auxiliary>
            <div className={classes.layoutContainer}>Layout containing Navbar, side drawer and backdrop</div>
            <div>{props.children}</div>
        </Auxiliary>
    )
};

export default Layout;