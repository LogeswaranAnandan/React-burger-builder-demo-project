import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import BurgerImage from '../../components/Burger/BurgerImage/BurgerImage';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Constants from '../../constants/constants';
import { Ingredients, IReduxState } from '../../models/Interface';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import HttpUtilService, { RequestMethods } from '../../core/HttpUtil/HttpUtilService';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

interface IBurgerBuilderState {
    showOrderConfirmationModal: boolean
}

interface IProps extends IReduxState, RouteComponentProps {
    addIngredientHandler(ingredientName: string): () => void,
    removeIngredientHandler(ingredientName: string): () => void
}

class BurgerBuilder extends Component<IProps, IBurgerBuilderState> {

    state: IBurgerBuilderState = {
        showOrderConfirmationModal: false
    }

    async componentDidMount() {
        // const ingredients = await this.getIngredients();
        // initialBurgerBuilderState.ingredients = ingredients;
        // this.setState({ ingredients: lodash.cloneDeep(ingredients) });
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

    orderButtonClickedHandler = () => {
        this.setState({
            showOrderConfirmationModal: true
        })
    }

    /* orderSummaryConfirmationHandler = async () => {
        let queryParamArray: string[] = [];
        for (let ing in this.props.ingredients) {
            queryParamArray.push(encodeURIComponent(`${ing}=${this.props.ingredients[ing]}`));
        }
        queryParamArray.push(encodeURIComponent(`price=${this.props.burgerPrice}`));
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParamArray.join('&')
        });
    } */

    orderSummaryConfirmationHandler = async () => {
        // let queryParamArray: string[] = [];
        // for (let ing in this.props.ingredients) {
        //     queryParamArray.push(encodeURIComponent(`${ing}=${this.props.ingredients[ing]}`));
        // }
        // queryParamArray.push(encodeURIComponent(`price=${this.props.burgerPrice}`));
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryParamArray.join('&')
        // });
        this.props.history.push('/checkout');
    }

    closeOrderSummaryModalHandler = () => {
        this.setState({
            showOrderConfirmationModal: false
        });
    }


    render() {
        let render = null;
        render = (
            <Auxiliary>
                <BurgerImage
                    ingredients={this.props.ingredients}
                />
                <BuildControls
                    addIngredientHandler={this.props.addIngredientHandler}
                    removeIngredientHandler={this.props.removeIngredientHandler}
                    orderButtonClickedHandler={this.orderButtonClickedHandler}
                    isRemovableIngredient={this.props.isRemovableIngredient}
                    burgerPrice={this.props.burgerPrice}
                />
                <Modal
                    show={this.state.showOrderConfirmationModal}
                    closeModalHandler={this.closeOrderSummaryModalHandler}
                >
                    <OrderSummary
                        ingredients={this.props.ingredients}
                        totalAmount={this.props.burgerPrice}
                        continueCheckoutHandler={this.orderSummaryConfirmationHandler}
                        cancelCheckoutHandler={this.closeOrderSummaryModalHandler}
                    />
                </Modal>
            </Auxiliary>
        );
        return render;
    }

}

const mapStateToProps = (reduxState: IReduxState) => {
    return reduxState;
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingredientName: string) => dispatch({
            type: Constants.DISPATCH_NAME.ADD_INGREDIENT,
            payload: {
                ingredientName: ingredientName
            }
        }),
        removeIngredientHandler: (ingredientName: string) => dispatch({
            type: Constants.DISPATCH_NAME.REMOVE_INGREDIENT,
            payload: {
                ingredientName: ingredientName
            }
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);