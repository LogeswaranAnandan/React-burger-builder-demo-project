import React, { ReactNode } from 'react';
import classes from './Button.module.css';

interface IProps {
    type: string,
    handler(): void,
    children: ReactNode
}

const Button = (props: IProps) => {
    return (
        <button className={[classes.Button, props.type].join(' ')} onClick={props.handler}>{props.children}</button>
    );
}

export default Button;