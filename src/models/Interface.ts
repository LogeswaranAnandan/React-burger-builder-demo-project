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
    burgerBuilderState: IReduxBurgerBuilderState,
    ordersState: IReduxOrdersState
}

export interface IReduxBurgerBuilderState {
    ingredients: Ingredients,
    isRemovableIngredient: RemovableIngredients
    burgerPrice: number
}

export interface IReduxOrdersState {
    orders: any[]
}

export interface ActionType {
    type: string,
    payload: any
}