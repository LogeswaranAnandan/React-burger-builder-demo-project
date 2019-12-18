import { IReduxBurgerBuilderState, ActionType } from "../../models/Interface";
import Constants from "../../constants/constants";
import * as lodash from 'lodash';
import ActionTypes from "../../constants/ActionTypes";

const initialState: IReduxBurgerBuilderState = {
    ingredients: null,
    isRemovableIngredient: {
        salad: false,
        bacon: false,
        cheese: false,
        meat: false
    },
    burgerPrice: 40
};

const INGREDIENTS_COST = Constants.INGREDIENTS_COST;

const reducer = (prevState = initialState, action: ActionType) => {
    const clonedPrevState = lodash.cloneDeep(prevState);
    switch (action.type) {
        case ActionTypes.ADD_INGREDIENT:
            return addIngredientHandler(clonedPrevState, action.payload);
        case ActionTypes.REMOVE_INGREDIENT:
            return removeIngredientHandler(clonedPrevState, action.payload);
        case ActionTypes.INIT_INGREDIENTS:
            return initIngredientHandler(clonedPrevState, action.payload)
        case ActionTypes.PLACE_ORDER_SUCCESS:
            return placeOrderSuccess(clonedPrevState);
        default:
            return prevState;
    }

}

const addIngredientHandler = (updatedState: IReduxBurgerBuilderState, { ingredientName }) => {
    const ingredientCount = updatedState.ingredients[ingredientName];
    updatedState.ingredients[ingredientName] = ingredientCount + 1;
    updatedState.burgerPrice = updatedState.burgerPrice + INGREDIENTS_COST[ingredientName];
    if (ingredientCount === 0) {
        updatedState.isRemovableIngredient[ingredientName] = true;
    }
    return updatedState;
}

const removeIngredientHandler = (updatedState: IReduxBurgerBuilderState, { ingredientName }) => {
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

const initIngredientHandler = (updatedState: IReduxBurgerBuilderState, { ingredients }) => {
    updatedState.ingredients = ingredients;
    return updatedState;
}

const placeOrderSuccess = (updatedState: IReduxBurgerBuilderState) => {
    for (let key in updatedState.ingredients) {
        updatedState.ingredients[key] = 0;
        updatedState.isRemovableIngredient[key] = false;
    }
    updatedState.burgerPrice = initialState.burgerPrice;
    return updatedState;
}

export default reducer;