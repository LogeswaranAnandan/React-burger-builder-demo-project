import React from 'react'
import { Ingredients } from '../../../models/Interface'

interface IProps {
    ingredients: Ingredients
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
            <div>
                Do you want to continue?
            </div>
        </div>
    );
}

export default OrderSummary;