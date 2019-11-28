import React from 'react';
import classes from './Backdrop.module.css';

interface IProps {
    show: boolean
}

const Backdrop = (props: IProps) => {
    let response = null;
    if (props.show) {
        response = (
            <div className={classes.Backdrop}>

            </div>
        )
    }
}

export default Backdrop;