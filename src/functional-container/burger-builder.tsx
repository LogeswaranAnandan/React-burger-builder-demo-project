import React, { useState, useEffect, useCallback } from 'react';
import { IReduxState, IReduxBurgerBuilderState } from '../models/Interface';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BurgerBuilderAction from '../redux/action-creators/BurgerBuilderActions';
import AuthActions from '../redux/action-creators/AuthActions';
import BurgerImage from '../components/Burger/BurgerImage/BurgerImage';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary';
import Constants from '../constants/constants';
import { History } from 'history';
import { useWhyDidYouUpdate } from '../custom-hooks/dev-helper-hooks';

// Interface Props
interface Props extends RouteComponentProps {}

// Component to hold logic for burger builder page
const FuncBurgerBuilder: React.FC<Props> = () => {
  // Fetching the history object from useHistory hook.
  const history: History = useHistory();

  // Local state.
  const [showOrderConfirmationModal, setShowOrderConfirmationModal] = useState(
    false
  );

  // Fetching redux state.
  const isAuthenticated = useSelector(
    (reduxState: IReduxState) => reduxState.authState.isAuthenticated
  );
  const {
    burgerPrice,
    ingredients,
    isRemovableIngredient,
  }: IReduxBurgerBuilderState = useSelector((reduxState: IReduxState) => {
    return { ...reduxState.burgerBuilderState };
  });

  // Fetching dispatch function.
  const dispatch = useDispatch();

  // Dispatch functions.
  const addIngredientHandler = (ingredientName: string) => {
    dispatch(BurgerBuilderAction.addIngredient(ingredientName));
  };

  const removeIngredientHandler = (ingredientName: string) => {
    dispatch(BurgerBuilderAction.removeIngredient(ingredientName));
  };
  const initIngredients = useCallback(() => {
    dispatch(BurgerBuilderAction.initIngredientsAsync());
  }, [dispatch]);

  const setRedirectPath = (redirectPath: string) => {
    dispatch(AuthActions.setRedirectPath(redirectPath));
  };

  const orderButtonClickedHandler = () => {
    if (isAuthenticated) {
      setShowOrderConfirmationModal(true);
    } else {
      setRedirectPath(Constants.URL.CHECKOUT_PAGE);
      history.push(Constants.URL.LOGIN_PAGE);
    }
  };

  const orderSummaryConfirmationHandler = async () => {
    history.push(Constants.URL.CHECKOUT_PAGE);
  };

  const closeOrderSummaryModalHandler = () => {
    setShowOrderConfirmationModal(false);
  };

  useWhyDidYouUpdate('burger-builder-container', {
    burgerPrice,
    dispatch,
    ingredients,
    initIngredients,
    isAuthenticated,
    isRemovableIngredient,
    showOrderConfirmationModal,
  });

  useEffect(() => {
    if (!ingredients) {
      initIngredients();
    }
  }, [ingredients, initIngredients]);

  // Return.
  return ingredients ? (
    <>
      <BurgerImage ingredients={ingredients} />
      <BuildControls
        addIngredientHandler={addIngredientHandler}
        removeIngredientHandler={removeIngredientHandler}
        orderButtonClickedHandler={orderButtonClickedHandler}
        isRemovableIngredient={isRemovableIngredient}
        burgerPrice={burgerPrice}
        isAuthenticated={isAuthenticated}
      />
      <Modal
        show={showOrderConfirmationModal}
        closeModalHandler={closeOrderSummaryModalHandler}
      >
        <OrderSummary
          ingredients={ingredients}
          totalAmount={burgerPrice}
          continueCheckoutHandler={orderSummaryConfirmationHandler}
          cancelCheckoutHandler={closeOrderSummaryModalHandler}
        />
      </Modal>
    </>
  ) : null;
};

// Export.
export default FuncBurgerBuilder;
