import React from 'react';
import classes from './Order.module.css';
import { Ingredients } from '../../../models/Interface';
import OrderModel from '../../../models/Order';
import TransformIngredients from '../../../util/transform-ingredients';

interface IProps {
    ingredients: Ingredients,
    price: number,
    orderDetails: OrderModel,
    clickHandler(order: OrderModel): void
}

const Order = (props: IProps) => {

    let ingredients = [];
    const transformedIngredients = TransformIngredients(props.ingredients);

    for ( let ingredientName in transformedIngredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: transformedIngredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            className={classes.Ingredients}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    return (
        <div className={classes.Order} onClick={() => props.clickHandler(props.orderDetails)}>
            <p><span className={classes.IngredientsLabel}>Ingredients:</span> {ingredientOutput}</p>
            <p>Price: <strong>INR {Number(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;