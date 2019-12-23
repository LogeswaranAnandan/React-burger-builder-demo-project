import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import BurgerImage from '../../components/Burger/BurgerImage/BurgerImage';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { IReduxState, IReduxBurgerBuilderState } from '../../models/Interface';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import BurgerBuilderAction from '../../redux/action-creators/BurgerBuilderActions';
import AuthActions from '../../redux/action-creators/AuthActions';
import Constants from '../../constants/constants';

interface IBurgerBuilderState {
    showOrderConfirmationModal: boolean
}

interface IProps extends IReduxBurgerBuilderState, RouteComponentProps {
    isAuthenticated: boolean,
    addIngredientHandler(ingredientName: string): void,
    removeIngredientHandler(ingredientName: string): void,
    initIngredients(): void,
    setRedirectPath(redirectPath: string): void
}

class BurgerBuilder extends Component<IProps, IBurgerBuilderState> {

    state: IBurgerBuilderState = {
        showOrderConfirmationModal: false
    }

    async componentDidMount() {
        if (!this.props.ingredients) {
            this.props.initIngredients();
        }
    }

    orderButtonClickedHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                showOrderConfirmationModal: true
            })
        } else {
            this.props.setRedirectPath(Constants.URL.CHECKOUT_PAGE);
            this.props.history.push(Constants.URL.LOGIN_PAGE);
        }
    }

    orderSummaryConfirmationHandler = async () => {
        this.props.history.push(Constants.URL.CHECKOUT_PAGE);
    }

    closeOrderSummaryModalHandler = () => {
        this.setState({
            showOrderConfirmationModal: false
        });
    }


    render() {
        let renderContent = <div>Some problem occurred while fetching ingredients!!! Please try again later.</div>;
        if (this.props.ingredients) {
            renderContent = (
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
                        isAuthenticated={this.props.isAuthenticated}
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
        }
        return renderContent;
    }

}

const mapStateToProps = (reduxState: IReduxState) => {
    return {
        ...reduxState.burgerBuilderState,
        isAuthenticated: reduxState.authState.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingredientName: string) => dispatch(BurgerBuilderAction.addIngredient(ingredientName)),
        removeIngredientHandler: (ingredientName: string) => dispatch(BurgerBuilderAction.removeIngredient(ingredientName)),
        initIngredients: () => dispatch(BurgerBuilderAction.initIngredientsAsync()),
        setRedirectPath: (redirectPath: string) => dispatch(AuthActions.setRedirectPath(redirectPath))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);