import React from 'react'
import { Ingredients } from '../../../models/Interface'
import Button from '../../UI/Button/Button';
import ButtonClasses from '../../UI/Button/Button.module.css';

interface IProps {
    ingredients: Ingredients,
    totalAmount: number,
    continueCheckoutHandler(): void,
    cancelCheckoutHandler(): void
}

const OrderSummary = (props: IProps) => {
    const listItems = Object.keys(props.ingredients).map((ingredientName) => {
        return (
            <li key={ingredientName}>
                <span style={{ textTransform: "capitalize" }}>{ingredientName}:</span> {props.ingredients[ingredientName]}
            </li>
        )
    });
    return (
        <div>
            <h3>Your Order</h3>
            <p>Your Burger is ready with the following ingredients</p>
            <ul>
                {listItems}
            </ul>
            <div style={{margin: '10px 0px'}}>Total Price: <strong><i>{props.totalAmount} INR</i></strong></div>
            <div>
                <div><strong>Do you want to continue?</strong></div>
                <Button type={ButtonClasses.Success} handler={props.continueCheckoutHandler}>Continue</Button>
                <Button type={ButtonClasses.Danger} handler={props.cancelCheckoutHandler}>Cancel</Button>
            </div>
        </div>
    );
}

export default OrderSummary;