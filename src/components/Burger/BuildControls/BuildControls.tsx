import React from 'react'
import BuildControl from './BuildControl/BuildControl';
import Constants from '../../../constants/constants';
import classes from './BuildControls.module.css';
import { RemovableIngredients } from '../../../models/Interface';

interface IProps {
    addIngredientHandler(ingredientName: string): void,
    removeIngredientHandler(ingredientName: string): void,
    isRemovableIngredient: RemovableIngredients,
    burgerPrice: number,
    orderButtonClickedHandler(): void
}

const BuildControls = (props: IProps) => {
    const availableIngredients: string[] = Constants.AVAILABLE_INGREDIENTS;

    const jsxBuildControlArray = availableIngredients.map((ingredientName) => {
        return (
            <BuildControl
                ingredientName={ingredientName}
                key={ingredientName}
                addIngredientHandler={() => { props.addIngredientHandler(ingredientName) }}
                removeIngredientHandler={() => { props.removeIngredientHandler(ingredientName) }}
                isRemovableIngredient={props.isRemovableIngredient[ingredientName]}
            />
        )
    });

    return (
        <div className={classes.BuildControls}>
            <div>
                Current Price: <strong>{props.burgerPrice}</strong>
            </div>
            {jsxBuildControlArray}
            <button className={classes.OrderButton} disabled={props.burgerPrice === 40} onClick={() => props.orderButtonClickedHandler()}>Order Now</button>
        </div>
    );
}

export default BuildControls;