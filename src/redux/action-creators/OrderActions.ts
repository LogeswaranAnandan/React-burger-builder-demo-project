import HttpUtilService, { RequestMethods } from "../../core/HttpUtil/HttpUtilService";
import ActionTypes from "../../constants/ActionTypes";
import Constants from "../../constants/constants";
import { ActionType } from "../../models/Interface";
import ToastService from "../../core/Toast/ToastService";
import { ToastType } from "../../models/enum";
import MessageConstants from "../../constants/MessageConstants";

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

    public static placeOrderAsync = (requestBody: any, authToken: string, routeHistory: any) => {
        return async (dispatch) => {
            try {
                const url = Constants.GET_ORDERS_URL + '?auth=' + authToken;
                await HttpUtilService.makeRequest(url, RequestMethods.POST, requestBody);
                ToastService.createToast(ToastType.SUCCESS, MessageConstants.SUCCESS_MSG.PLACE_ORDER);
                dispatch(OrderActions.resetBurgerBuilderState());
                routeHistory.push(Constants.URL.LANDING_PAGE);
            } catch (err) {
                console.log('ERR: PLACE_ORDER', err);
                ToastService.createToast(ToastType.ERROR, MessageConstants.ERROR_MSG.ERR_PLACE_ORDER);
            }
        }
    }

    public static fetchOrdersAsync = (userId: string, authToken: string) => {
        return async (dispatch) => {
            try {
                const queryParams = '?auth=' + authToken + '&orderBy="userId"&equalTo="' + userId + '"';
                let orders = [];
                const url = Constants.GET_ORDERS_URL + queryParams;
                const unstructuredOrders = await HttpUtilService.makeRequest(url, RequestMethods.GET)
                for (let key in unstructuredOrders) {
                    orders.push({ ...unstructuredOrders[key], id: key });
                }
                dispatch(OrderActions.fetchOrdersSuccess(orders));
            } catch (err) {
                console.log('ERR: FETCH_ORDERS', err);
                ToastService.createToast(ToastType.ERROR, MessageConstants.ERROR_MSG.ERR_FETCH_ORDERS);
            }
        }
    }
}