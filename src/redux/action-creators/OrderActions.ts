import HttpUtilService, { RequestMethods } from "../../core/HttpUtil/HttpUtilService";
import ActionTypes from "../../constants/ActionTypes";
import Constants from "../../constants/constants";
import { ActionType } from "../../models/Interface";

export default class OrderActions {
    private static placeOrderSuccess = (orderResponse) => {
        return {
            type: ActionTypes.PLACE_ORDER_SUCCESS
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
                const orderResponse = await HttpUtilService.makeRequest('/Orders.json', RequestMethods.POST, requestBody);
                dispatch(OrderActions.placeOrderSuccess(orderResponse));
                routeHistory.push("/")
            } catch (err) {
                console.log('ERR: PLACE_ORDER', err);
            }
        }
    }

    public static fetchOrdersAsync = () => {
        return async (dispatch) => {
            try {
                let orders = [];
                const unstructuredOrders = await HttpUtilService.makeRequest(Constants.GET_ORDERS_URL, RequestMethods.GET)
                console.log('orders', unstructuredOrders);
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