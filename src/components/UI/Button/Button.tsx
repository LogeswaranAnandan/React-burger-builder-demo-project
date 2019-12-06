import React, { ReactNode } from 'react';
import classes from './Button.module.css';

interface IProps {
    type: string,
    handler(): void,
    children: ReactNode,
    isDisabled?: boolean
}

const Button = (props: IProps) => {
    return (
        <button className={[classes.Button, props.type].join(' ')} onClick={props.handler} disabled={props.isDisabled}>{props.children}</button>
    );
}

export default Button;