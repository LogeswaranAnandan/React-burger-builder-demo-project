export interface Ingredients {
    salad: number,
    bacon: number,
    cheese: number,
    meat: number,
}

export interface RemovableIngredients {
    salad: boolean,
    bacon: boolean,
    cheese: boolean,
    meat: boolean
}

export interface IReduxState {
    ingredients: Ingredients,
    isRemovableIngredient: RemovableIngredients
    burgerPrice: number
}