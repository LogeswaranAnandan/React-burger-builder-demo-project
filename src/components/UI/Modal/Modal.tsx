import React, { ReactNode } from 'react'
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

interface IProps {
    show: boolean,
    closeModalHandler(): void,
    children: ReactNode
}

const Modal = (props: IProps) => {
    return (
        <Auxiliary>
            <Backdrop show={props.show} closeBackdropHandler={props.closeModalHandler} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Auxiliary>
    )
}

export default Modal;