import React from 'react';
import classes from './Backdrop.module.css';

interface IProps {
    show: boolean,
    closeBackdropHandler(): void
}

const Backdrop = (props: IProps) => {
    let response = null;
    if (props.show) {
        response = (
            <div className={classes.Backdrop} onClick={props.closeBackdropHandler}>
            </div>
        )
    }
    return response;
}

export default Backdrop;