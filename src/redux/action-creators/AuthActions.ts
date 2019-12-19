import HttpUtilService, { RequestMethods } from "../../core/HttpUtil/HttpUtilService";
import ActionTypes from "../../constants/ActionTypes";
import Constants from "../../constants/constants";
import { ActionType } from "../../models/Interface";

export default class AuthActions {

    public static loginSuccess = (loginResponse) => {
        const loginSuccessAction = {
            type: ActionTypes.LOGIN_SUCCESS,
            payload: loginResponse
        };

        return (dispatch) => {
            setTimeout(() => {
                dispatch(AuthActions.logoutSuccess())
            }, Number(loginResponse.expiresIn) * 1000);
            dispatch(loginSuccessAction);
        }
    }

    public static signupSuccess = (signupResponse) => {
        const signupSuccessAction = {
            type: ActionTypes.SIGNUP_SUCCESS,
            payload: signupResponse
        };

        return (dispatch) => {
            setTimeout(() => {
                dispatch(AuthActions.logoutSuccess())
            }, Number(signupResponse.expiresIn) * 1000);
        }
    }

    public static logoutSuccess = (): ActionType => {
        return {
            type: ActionTypes.LOGOUT_SUCCESS
        }
    }

    public static onLoadTokenCheck = (): ActionType => {
        return {
            type: ActionTypes.ONLOAD_AUTH_TOKEN_CHECK
        }
    }

    public static setRedirectPath = (redirectPath): ActionType => {
        return {
            type: ActionTypes.SET_REDIRECT_PATH,
            payload: {
                redirectPath: redirectPath
            }
        }
    }

    public static clearRedirectPath = (): ActionType => {
        return {
            type: ActionTypes.CLEAR_REDIRECT_PATH
        }
    }
}