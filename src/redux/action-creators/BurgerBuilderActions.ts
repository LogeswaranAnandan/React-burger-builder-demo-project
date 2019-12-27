import ActionTypes from "../../constants/ActionTypes";
import HttpUtilService, { RequestMethods } from "../../core/HttpUtil/HttpUtilService";
import { Ingredients } from "../../models/Interface";
import TransformIngredients from "../../util/transform-ingredients";

export default class BurgerBuilderAction {
    public static addIngredient = (ingredientName: string) => {
        return {
            type: ActionTypes.ADD_INGREDIENT,
            payload: {
                ingredientName: ingredientName
            }
        };
    };

    public static removeIngredient = (ingredientName: string) => {
        return {
            type: ActionTypes.REMOVE_INGREDIENT,
            payload: {
                ingredientName: ingredientName
            }
        }
    };

    public static initIngredientsAsync = () => {
        return async (dispatch) => {
            try {
                const ingredients = await HttpUtilService.makeRequest('/Ingredients.json', RequestMethods.GET);
                // To get the response in the order of salad, bacon, cheese and meat. So that the UI looks nice.
                const finalIngredients: Ingredients = TransformIngredients(ingredients);
                dispatch(BurgerBuilderAction.initIngredients(finalIngredients));
            } catch (err) {
                console.log('ERR_INIT_INGREDIENTS', err);
            }
        }
    }

    private static initIngredients = (ingredients: Ingredients) => {
        return {
            type: ActionTypes.INIT_INGREDIENTS,
            payload: {
                ingredients: ingredients
            }
        }
    }

}