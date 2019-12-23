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
    ordersState: IReduxOrdersState,
    authState: IReduxAuthState
}

export interface IReduxBurgerBuilderState {
    ingredients: Ingredients,
    isRemovableIngredient: RemovableIngredients
    burgerPrice: number
}

export interface IReduxOrdersState {
    orders: any[]
}

export interface IReduxAuthState {
    isAuthenticated: boolean,
    authToken: string,
    redirectPath: string
}

export interface ActionType {
    type: string,
    payload?: any
}



export interface InputFieldType {
    inputType: string,
    label: string,
    htmlProperties: {
        type?: 'text' | 'password' | 'email' | 'number',
        placeholder?: string,
        options?: { displayName: string, value: any }[]
    },
    value: any,
    validationRules: ValidationRules
    isValid: boolean,
    isTouched: boolean,
    errorMessage: string
}

export interface ValidationRules {
    required?: boolean,
    minLength?: number,
    maxLength?: number
}