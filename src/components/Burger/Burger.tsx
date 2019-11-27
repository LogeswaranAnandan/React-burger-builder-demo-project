import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredientImage from './BurgerIngredientImage/BurgerIngredientImage';
import { IBurgerBuilderState } from '../../interface/StateInterface';

const Burger = (props: IBurgerBuilderState) => {
    let finalIngredientsArray: any[] = [];
    const keys: string[] = Object.keys(props.ingredients);
    keys.forEach(key => {
        const ingredientCount = (props.ingredients as any)[key];
        for (let i=0; i < ingredientCount; i++) {
            finalIngredientsArray.push(
                <BurgerIngredientImage type={key}/>
            );
        }
    });
    return (
        <div className={classes.Burger}>
            <BurgerIngredientImage type="bread-top"/>
            {finalIngredientsArray}
            <BurgerIngredientImage type="bread-bottom"/>
        </div>
    )
}

export default Burger;