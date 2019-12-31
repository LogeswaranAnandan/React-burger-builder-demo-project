import React from 'react';
import { ToastType } from '../../../models/enum';
import classes from './ToastComponent.module.css';

interface IProps {
    title: ToastType,
    message: string
}

const ToastComponent = (props: IProps) => {
    return (
        <div className={classes.ToastContainer}>
            <div className={classes.Title}>{props.title}</div>
            <div>{props.message}</div>
        </div>
    )
};

export default ToastComponent;