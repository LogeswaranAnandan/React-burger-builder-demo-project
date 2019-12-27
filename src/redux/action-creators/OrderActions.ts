import HttpUtilService, { RequestMethods } from "../../core/HttpUtil/HttpUtilService";
import ActionTypes from "../../constants/ActionTypes";
import Constants from "../../constants/constants";
import { ActionType } from "../../models/Interface";

export default class OrderActions {
    public static resetBurgerBuilderState = () => {
        return {
            type: ActionTypes.RESET_BURGER_BUILDER_STATE
        }
    }

    private static fetchOrdersSuccess = (orders): ActionType => {
        return {
            type: ActionTypes.FETCH_ORDER_SUCCESS,
            payload: {
                orders: orders
            }
        }
    }

    public static placeOrderAsync = (requestBody: any, routeHistory: any) => {
        return async (dispatch) => {
            try {
                await HttpUtilService.makeRequest(Constants.GET_ORDERS_URL, RequestMethods.POST, requestBody);
                dispatch(OrderActions.resetBurgerBuilderState());
                routeHistory.push(Constants.URL.LANDING_PAGE);
            } catch (err) {
                console.log('ERR: PLACE_ORDER', err);
            }
        }
    }

    public static fetchOrdersAsync = (userId: string) => {
        return async (dispatch) => {
            try {
                let orders = [];
                const url = Constants.GET_ORDERS_URL + '?orderBy="userId"&equalTo="' + userId + '"';
                const unstructuredOrders = await HttpUtilService.makeRequest(url, RequestMethods.GET)
                for (let key in unstructuredOrders) {
                    orders.push({ ...unstructuredOrders[key], id: key });
                }
                dispatch(OrderActions.fetchOrdersSuccess(orders));
            } catch (err) {
                console.log('ERR: FETCH_ORDERS', err);
            }
        }
    }
}