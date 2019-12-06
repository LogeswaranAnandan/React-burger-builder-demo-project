import React from 'react';
import BurgerImage from '../../Burger/BurgerImage/BurgerImage';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
import ButtonClasses from '../../UI/Button/Button.module.css';
import { Ingredients } from '../../../models/Interface';

interface IProps {
    ingredients: Ingredients,
    price: number,
    continueHandler(): void,
    cancelHandler(): void
}

const CheckoutSummary = (props: IProps) => {
    return (
        <div className={classes.CheckoutSummaryContainer}>
            <h4>We hope it tastes well!!!</h4>
            <BurgerImage ingredients={props.ingredients} />
            <div><strong>Total Price: {props.price}</strong></div>
            <div className={classes.ButtonContainer}>
                <Button type={ButtonClasses.Success} handler={props.continueHandler}>Continue</Button>
                <Button type={ButtonClasses.Danger} handler={props.cancelHandler}>Cancel</Button>
            </div>
        </div>
    );
}

export default CheckoutSummary;