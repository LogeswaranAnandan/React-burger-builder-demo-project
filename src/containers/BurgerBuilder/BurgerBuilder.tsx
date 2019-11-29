import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/BurgerImage/BurgerImage';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Constants from '../../constants/constants';
import { Ingredients, RemovableIngredients } from '../../models/Interface';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import * as lodash from 'lodash';

interface IBurgerBuilderState {
    ingredients: Ingredients,
    isRemovableIngredient: RemovableIngredients
    burgerPrice: number,
    showOrderConfirmationModal: boolean
}

const initialBurgerBuilderState = {
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
    burgerPrice: 40,
    showOrderConfirmationModal: false
};

class BurgerBuilder extends Component<any, IBurgerBuilderState> {

    INGREDIENTS_COST = Constants.INGREDIENTS_COST;
    

    constructor(props) {
        super(props);
        this.state = lodash.cloneDeep(initialBurgerBuilderState);
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

    orderSummaryConfirmationHandler = () => {
        alert('Your order is confirmed');
        this.setState(lodash.cloneDeep(initialBurgerBuilderState));
    }

    closeOrderSummaryModalHandler = () => {
        this.setState({
            showOrderConfirmationModal: false
        });
    }


    render() {
        return (
            <Auxiliary>
                <Burger
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

}

export default BurgerBuilder;