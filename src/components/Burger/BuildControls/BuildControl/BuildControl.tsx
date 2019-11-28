import React from 'react'
import classes from './BuildControl.module.css';

interface IProps {
    ingredientName: string,
    addIngredientHandler(): void,
    removeIngredientHandler(): void,
    isRemovableIngredient: boolean
}

const BuildControl = (props: IProps) => {
    return (
        <div className={classes.BuildControl}>
            <span className={classes.Label}>{props.ingredientName}</span>
            <button className={classes.Add} onClick={props.addIngredientHandler}>Add</button>
            <button className={classes.Remove} onClick={props.removeIngredientHandler} disabled={!props.isRemovableIngredient}>Remove</button>
        </div>
    )
}

export default BuildControl;