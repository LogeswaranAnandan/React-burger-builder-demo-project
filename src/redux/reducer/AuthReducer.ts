import { ActionType, IReduxAuthState } from "../../models/Interface";
import ActionTypes from "../../constants/ActionTypes";
import updateObject from "../../util/update-object";
import Constants from "../../constants/constants";
import TokenUtil from "../../util/token-util";

const initialState: IReduxAuthState = {
    isAuthenticated: false,
    userId: null,
    authToken: null,
    redirectPath: Constants.URL.LANDING_PAGE
};

const authReducer = (prevState: IReduxAuthState = initialState, action: ActionType) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS: return loginSuccess(prevState, action.payload);
        case ActionTypes.SIGNUP_SUCCESS: return signupSuccess(prevState, action.payload);
        case ActionTypes.LOGOUT_SUCCESS: return logout(prevState, action.payload);
        case ActionTypes.UPDATE_STATE_WITH_AUTH_INFO_ON_LOAD: return updateStateWithAuthInfoOnLoad(prevState, action.payload);
        case ActionTypes.SET_REDIRECT_PATH: return setRedirectPath(prevState, action.payload);
        case ActionTypes.CLEAR_REDIRECT_PATH: return clearRedirectPath(prevState, action.payload);
        default:
            return prevState;
    }
}

const loginSuccess = (prevState: IReduxAuthState, payload: any) => {
    TokenUtil.storeTokenToLocalStorage(payload.idToken);
    TokenUtil.storeExpirationTimeToLocalStorage(payload.expiresIn);
    TokenUtil.storeUserIdToLocalStorage(payload.localId);
    return updateObject(prevState, {
        isAuthenticated: true,
        authToken: payload.idToken,
        userId: payload.localId
    } as IReduxAuthState);
}

const signupSuccess = (prevState: IReduxAuthState, payload: any) => {
    TokenUtil.storeTokenToLocalStorage(payload.idToken);
    TokenUtil.storeExpirationTimeToLocalStorage(payload.expiresIn);
    TokenUtil.storeUserIdToLocalStorage(payload.localId);
    return updateObject(prevState, {
        isAuthenticated: true,
        authToken: payload.idToken,
        userId: payload.localId
    } as IReduxAuthState);
}

const logout = (prevState: IReduxAuthState, payload: any) => {
    TokenUtil.clearTokenFromLocalStorage();
    return updateObject(prevState, {
        isAuthenticated: false,
        authToken: null,
        userId: null
    } as IReduxAuthState);
}

const updateStateWithAuthInfoOnLoad = (prevState: IReduxAuthState, payload: any) => {
    return updateObject(prevState, {
        isAuthenticated: true,
        authToken: payload.authToken,
        userId: payload.userId
    })
}

const setRedirectPath = (prevState: IReduxAuthState, payload: any) => {
    return updateObject(prevState, {
        redirectPath: payload.redirectPath
    });
}

const clearRedirectPath = (prevState: IReduxAuthState, payload: any) => {
    return updateObject(prevState, {
        redirectPath: Constants.URL.LANDING_PAGE
    });
}

export default authReducer;