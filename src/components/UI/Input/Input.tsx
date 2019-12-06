import React from 'react';
import classes from './Input.module.css';
import Constants from '../../../constants/constants';

interface IProps {
    id: string,
    name?: string,
    inputType: string,
    label: string,
    value: any,
    htmlProperties: {
        type?: string,
        placeholder?: string,
        options?: { displayName: string, value: any }[]
    },
    isValid: boolean,
    isTouched: boolean,
    errorMessage: string,
    onChangeHandler(key, event): void,
    onBlurHandler(key, event): void
}

const Input = (props: IProps) => {

    let inputElement = null;
    let inputElClasses: string[] = [classes.InputElement];
    let errorMessage = null;

    if (!props.isValid && props.isTouched) {
        inputElClasses.push(classes.Invalid);
        errorMessage = props.errorMessage
    }


    switch (props.inputType) {
        case Constants.INPUT_TYPE.INPUT:
            inputElement = (
                <input
                    {...props.htmlProperties}
                    className={inputElClasses.join(' ')}
                    value={props.value}
                    onChange={(event) => props.onChangeHandler(props.id, event)}
                    onBlur={(event) => props.onBlurHandler(props.id, event)}
                />
            );
            break;
        case Constants.INPUT_TYPE.SELECT:
            inputElement = (
                <select
                    className={inputElClasses.join(' ')}
                    value={props.value}
                    onChange={(event) => props.onChangeHandler(props.id, event)}
                    onBlur={(event) => props.onBlurHandler(props.id, event)}
                >
                    {props.htmlProperties.options.map((prop) => {
                        return (
                            <option
                                key={prop.value}
                                value={prop.value}
                                disabled={prop.value === ''}
                            >{prop.displayName}</option>
                        )
                    })}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    {...props.htmlProperties}
                    className={inputElClasses.join(' ')}
                    value={props.value}
                    onChange={(event) => props.onChangeHandler(props.id, event)}
                    onBlur={(event) => props.onBlurHandler(props.id, event)}
                />
            );
            break;
    }

    return (
        <div className={classes.InputContainer}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            <div className={classes.ErrorMessage}>
                {errorMessage}
            </div>
        </div>
    );
}

export default Input;