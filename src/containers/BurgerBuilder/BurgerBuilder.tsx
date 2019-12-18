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

interface IBurgerBuilderState {
    showOrderConfirmationModal: boolean
}

interface IProps extends IReduxBurgerBuilderState, RouteComponentProps {
    addIngredientHandler(ingredientName: string): void,
    removeIngredientHandler(ingredientName: string): void,
    initIngredients(): void
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
        this.setState({
            showOrderConfirmationModal: true
        })
    }

    orderSummaryConfirmationHandler = async () => {
        this.props.history.push('/checkout');
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
    return reduxState.burgerBuilderState;
}

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingredientName: string) => dispatch(BurgerBuilderAction.addIngredient(ingredientName)),
        removeIngredientHandler: (ingredientName: string) => dispatch(BurgerBuilderAction.removeIngredient(ingredientName)),
        initIngredients: () => dispatch(BurgerBuilderAction.initIngredientsAsync())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);