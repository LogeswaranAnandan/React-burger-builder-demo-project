import ActionTypes from "../../constants/ActionTypes";
import { ActionType } from "../../models/Interface";
import TokenUtil from "../../util/token-util";

export default class AuthActions {

    public static loginSuccess = (loginResponse) => {
        const loginSuccessAction = {
            type: ActionTypes.LOGIN_SUCCESS,
            payload: loginResponse
        };

        return (dispatch) => {
            setTimeout(() => {
                dispatch(AuthActions.logout())
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
                dispatch(AuthActions.logout())
            }, Number(signupResponse.expiresIn) * 1000);
            dispatch(signupSuccessAction);
        }
    }

    public static logout = (): ActionType => {
        return {
            type: ActionTypes.LOGOUT_SUCCESS
        }
    }

    public static onLoadTokenCheck = () => {

        const updateStateWithAuthInfoOnLoadAction = (authToken): ActionType => {
            return {
                type: ActionTypes.UPDATE_STATE_WITH_AUTH_INFO_ON_LOAD,
                payload: {
                    authToken: authToken
                }
            }
        }

        return (dispatch) => {
            let currentAuthToken = TokenUtil.fetchTokenFromLocalStorage();
            const { expirationTime, issuedAt } = TokenUtil.fetchExpirationTimeFromLocalStorage();
            if (currentAuthToken != null && expirationTime != null && issuedAt != null) {
                const timeDifferenceInMilliSeconds = new Date().getTime() - issuedAt.getTime();
                if (timeDifferenceInMilliSeconds < expirationTime) {
                    setTimeout(() => {
                        dispatch(AuthActions.logout());
                    }, expirationTime - timeDifferenceInMilliSeconds);
                    dispatch(updateStateWithAuthInfoOnLoadAction(currentAuthToken));
                } else {
                    dispatch(AuthActions.logout());
                }
            } else {
                dispatch(AuthActions.logout());
            }
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