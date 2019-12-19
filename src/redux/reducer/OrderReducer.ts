import { ActionType, IReduxOrdersState } from "../../models/Interface";
import ActionTypes from "../../constants/ActionTypes";

const initialState: IReduxOrdersState = {
    orders: []
};

const orderReducer = (prevState = initialState, action: ActionType) => {
    switch(action.type) {
        case ActionTypes.FETCH_ORDER_SUCCESS: return fetchOrdersSuccess(prevState, action);
        default:
            return prevState;
    }
}

const fetchOrdersSuccess = (prevState: IReduxOrdersState, action: ActionType): IReduxOrdersState => {
    return {
        orders: action.payload.orders
    }
}

export default orderReducer;