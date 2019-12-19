import { ActionType, IReduxOrdersState, IReduxAuthState } from "../../models/Interface";
import ActionTypes from "../../constants/ActionTypes";
import updateObject from "../../util/update-object";
import Constants from "../../constants/constants";
import TokenUtil from "../../util/token-util";

const initialState: IReduxAuthState = {
    isAuthenticated: false,
    authToken: null,
    redirectPath: "/"
};

const authReducer = (prevState: IReduxAuthState = initialState, action: ActionType) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS: return loginSuccess(prevState, action.payload);
        case ActionTypes.SIGNUP_SUCCESS: return signupSuccess(prevState, action.payload);
        case ActionTypes.LOGOUT_SUCCESS: return logoutSuccess(prevState, action.payload);
        case ActionTypes.ONLOAD_AUTH_TOKEN_CHECK: return onLoadAuthTokenCheck(prevState, action.payload);
        case ActionTypes.SET_REDIRECT_PATH: return setRedirectPath(prevState, action.payload);
        case ActionTypes.CLEAR_REDIRECT_PATH: return clearRedirectPath(prevState, action.payload);
        default:
            return prevState;
    }
}

const loginSuccess = (prevState: IReduxAuthState, payload: any) => {
    TokenUtil.storeTokenToLocalStorage(payload.idToken);
    return updateObject(prevState, {
        isAuthenticated: true,
        authToken: payload.idToken
    });
}

const signupSuccess = (prevState: IReduxAuthState, payload: any) => {
    TokenUtil.storeTokenToLocalStorage(payload.idToken);
    return updateObject(prevState, {
        isAuthenticated: true,
        authToken: payload.idToken
    });
}

const logoutSuccess = (prevState: IReduxAuthState, payload: any) => {
    TokenUtil.clearTokenFromLocalStorage();
    return updateObject(prevState, {
        isAuthenticated: false,
        authToken: null
    });
}

const onLoadAuthTokenCheck = (prevState: IReduxAuthState, payload: any) => {
    const currentAuthToken = TokenUtil.fetchTokenFromLocalStorage();
    if (currentAuthToken != null) {
        return updateObject(prevState, {
            isAuthenticated: true,
            authToken: currentAuthToken
        })
    } else {
        return prevState;
    }
}

const setRedirectPath = (prevState: IReduxAuthState, payload: any) => {
    return updateObject(prevState, {
        redirectPath: payload.redirectPath
    });
}

const clearRedirectPath = (prevState: IReduxAuthState, payload: any) => {
    return updateObject(prevState, {
        redirectPath: "/"
    });
}

export default authReducer;