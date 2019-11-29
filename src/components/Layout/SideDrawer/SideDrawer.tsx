import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

interface IProps {
    show: boolean,
    closeSideDrawerHandler(): void
}

const SideDrawer = (props: IProps) => {

    let sideDrawerClasses = [classes.SideDrawer, classes.Close];
    if (props.show) {
        sideDrawerClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Auxiliary>
            <Backdrop show={props.show} closeBackdropHandler={props.closeSideDrawerHandler}/>
            <div className={sideDrawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default SideDrawer;