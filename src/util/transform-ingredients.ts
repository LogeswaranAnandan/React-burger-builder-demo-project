import { Ingredients } from "../models/Interface";

const TransformIngredients = (ingredients: Ingredients) => {
    const finalIngredients: Ingredients = {
        salad: null,
        bacon: null,
        cheese: null,
        meat: null
    }
    Object.keys(ingredients).forEach((key) => {
        finalIngredients[key] = ingredients[key];
    });
    return finalIngredients;
}

export default TransformIngredients;