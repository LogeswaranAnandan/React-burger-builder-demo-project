import React from 'react';
import classes from './Backdrop.module.css';

interface IProps {
    show: boolean,
    closeModalHandler(): void,
    children: any
}

const Backdrop = (props: IProps) => {

    const stopEventPropagation = (event: any) => {
        event.stopPropagation();
    }

    let response = null;
    if (props.show) {
        response = (
            <div className={classes.Backdrop} onClick={props.closeModalHandler}>
                <div onClick={(e) => stopEventPropagation(e)}>
                    {props.children}
                </div>
            </div>
        )
    }
    return response;
}

export default Backdrop;