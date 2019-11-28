import React from 'react';
import classes from './BurgerImage.module.css';
import BurgerIngredientImage from './BurgerIngredientImage/BurgerIngredientImage';
import { Ingredients } from '../../../models/Interface';

interface IProps {
    ingredients: Ingredients
}

const Burger = (props: IProps) => {
    let finalIngredientsArray = [];
    const ingredientKeys: string[] = Object.keys(props.ingredients);
    ingredientKeys.forEach(key => {
        const ingredientCount = (props.ingredients as any)[key];
        for (let i=0; i < ingredientCount; i++) {
            finalIngredientsArray.push(
                <BurgerIngredientImage type={key} key={key+'_'+i}/>
            );
        }
    });
    if (finalIngredientsArray.length === 0) {
        finalIngredientsArray.push(<p key="empty-ingredients">Please add some ingredients</p>)
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredientImage type="bread-top"/>
            {finalIngredientsArray}
            <BurgerIngredientImage type="bread-bottom"/>
        </div>
    )
}

export default Burger;