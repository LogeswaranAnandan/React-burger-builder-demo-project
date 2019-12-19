import Constants from "../constants/constants";

export default class TokenUtil {

    public static storeTokenToLocalStorage = (authToken: string) => {
        localStorage.setItem(Constants.AUTH_TOKEN_KEY, authToken);
    }

    public static fetchTokenFromLocalStorage = () => {
        return localStorage.getItem(Constants.AUTH_TOKEN_KEY);
    }

    public static clearTokenFromLocalStorage = () => {
        localStorage.removeItem(Constants.AUTH_TOKEN_KEY);
    }

}