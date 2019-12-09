import { IReduxState } from "../models/Interface";
import Constants from "../constants/constants";
import * as lodash from 'lodash';

const initialState: IReduxState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    isRemovableIngredient: {
        salad: false,
        bacon: false,
        cheese: false,
        meat: false
    },
    burgerPrice: 4
};

const DISPATCH_NAME = Constants.DISPATCH_NAME;
const INGREDIENTS_COST = Constants.INGREDIENTS_COST;

const reducer = (prevState = initialState, action: {type: string, payload: any}) => {
    const clonedPrevState = lodash.cloneDeep(prevState);
    switch(action.type) {
        case DISPATCH_NAME.ADD_INGREDIENT:
            return addIngredientHandler(clonedPrevState, action.payload.ingredientName);
        case DISPATCH_NAME.REMOVE_INGREDIENT:
            return removeIngredientHandler(clonedPrevState, action.payload.ingredientName);
        default:
            return prevState;
    }

}

const addIngredientHandler = (updatedState: IReduxState, ingredientName: string) => {
    const ingredientCount = updatedState.ingredients[ingredientName];
    updatedState.ingredients[ingredientName] = ingredientCount + 1;
    updatedState.burgerPrice = updatedState.burgerPrice + INGREDIENTS_COST[ingredientName];
    if (ingredientCount === 0) {
        updatedState.isRemovableIngredient[ingredientName] = true;
    }
    return updatedState;
}

const removeIngredientHandler = (updatedState: IReduxState, ingredientName: string) => {
    const ingredientCount = updatedState.ingredients[ingredientName];
    if (ingredientCount > 0) {
        updatedState.ingredients[ingredientName] = ingredientCount - 1;
        updatedState.burgerPrice = updatedState.burgerPrice - INGREDIENTS_COST[ingredientName];
        if (ingredientCount === 1) {
            updatedState.isRemovableIngredient[ingredientName] = false;
        }
        return updatedState;
    }
}

export default reducer;