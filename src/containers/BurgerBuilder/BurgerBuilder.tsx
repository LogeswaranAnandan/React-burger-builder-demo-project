import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import BurgerImage from '../../components/Burger/BurgerImage/BurgerImage';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Constants from '../../constants/constants';
import { Ingredients, RemovableIngredients } from '../../models/Interface';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import * as lodash from 'lodash';
import HttpUtilService, { RequestMethods } from '../../core/HttpUtil/HttpUtilService';
import { RouteComponentProps } from 'react-router';

interface IBurgerBuilderState {
    ingredients: Ingredients,
    isRemovableIngredient: RemovableIngredients
    burgerPrice: number,
    showOrderConfirmationModal: boolean
}

const initialBurgerBuilderState = {
    ingredients: {},
    isRemovableIngredient: {
        salad: false,
        bacon: false,
        cheese: false,
        meat: false
    },
    burgerPrice: 40,
    showOrderConfirmationModal: false
};

class BurgerBuilder extends Component<RouteComponentProps, IBurgerBuilderState> {

    INGREDIENTS_COST = Constants.INGREDIENTS_COST;

    constructor(props) {
        super(props);
        this.state = lodash.cloneDeep(initialBurgerBuilderState);
    }

    async componentDidMount() {
        const ingredients = await this.getIngredients();
        initialBurgerBuilderState.ingredients = ingredients;
        this.setState({ingredients: lodash.cloneDeep(ingredients)});
    }

    async getIngredients() {
        const ingredients = await HttpUtilService.makeRequest('/Ingredients.json', RequestMethods.GET);
        
        // To get the response in the order of salad, bacon, cheese and meat. So that the UI looks nice.
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

    addIngredientHandler = (ingredientName: string) => {
        const ingredientCount = this.state.ingredients[ingredientName];
        let updatedState = { ...this.state };
        updatedState.ingredients[ingredientName] = ingredientCount + 1;
        updatedState.burgerPrice = updatedState.burgerPrice + this.INGREDIENTS_COST[ingredientName];
        if (ingredientCount === 0) {
            updatedState.isRemovableIngredient[ingredientName] = true;
        }
        this.setState(updatedState);
    }

    removeIngredientHandler = (ingredientName: string) => {
        const ingredientCount = this.state.ingredients[ingredientName];
        let updatedState = { ...this.state };
        if (ingredientCount > 0) {
            updatedState.ingredients[ingredientName] = ingredientCount - 1;
            updatedState.burgerPrice = updatedState.burgerPrice - this.INGREDIENTS_COST[ingredientName];
            if (ingredientCount === 1) {
                updatedState.isRemovableIngredient[ingredientName] = false;
            }
            this.setState(updatedState);
        }
    }

    orderButtonClickedHandler = () => {
        this.setState({
            showOrderConfirmationModal: true
        })
    }

    orderSummaryConfirmationHandler = async () => {
        let queryParamArray: string[] = [];
        for (let ing in this.state.ingredients) {
            queryParamArray.push(encodeURIComponent(`${ing}=${this.state.ingredients[ing]}`));
        }
        queryParamArray.push(encodeURIComponent(`price=${this.state.burgerPrice}`));
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParamArray.join('&')
        });
    }

    closeOrderSummaryModalHandler = () => {
        this.setState({
            showOrderConfirmationModal: false
        });
    }


    render() {
        let render = null;
        if (this.state) {
            render = (
                <Auxiliary>
                    <BurgerImage
                        ingredients={this.state.ingredients}
                    />
                    <BuildControls
                        addIngredientHandler={this.addIngredientHandler}
                        removeIngredientHandler={this.removeIngredientHandler}
                        orderButtonClickedHandler={this.orderButtonClickedHandler}
                        isRemovableIngredient={this.state.isRemovableIngredient}
                        burgerPrice={this.state.burgerPrice}
                    />
                    <Modal
                        show={this.state.showOrderConfirmationModal}
                        closeModalHandler={this.closeOrderSummaryModalHandler}
                    >
                        <OrderSummary
                            ingredients={this.state.ingredients}
                            totalAmount={this.state.burgerPrice}
                            continueCheckoutHandler={this.orderSummaryConfirmationHandler}
                            cancelCheckoutHandler={this.closeOrderSummaryModalHandler}
                        />
                    </Modal>
                </Auxiliary>
            );
        }
        return render;
    }

}

export default BurgerBuilder;