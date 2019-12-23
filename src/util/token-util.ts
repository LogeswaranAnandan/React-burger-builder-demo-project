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
        localStorage.removeItem(Constants.AUTH_TOKEN_EXPIRATION_KEY);
    }    

    public static storeExpirationTimeToLocalStorage = (expirationTime: string) => {
        const expirationTimeInMilliSeconds = Number(expirationTime) * 1000;
        localStorage.setItem(Constants.AUTH_TOKEN_ISSUED_DATETIME, new Date().toJSON());
        localStorage.setItem(Constants.AUTH_TOKEN_EXPIRATION_KEY, expirationTimeInMilliSeconds.toString());
    }

    public static fetchExpirationTimeFromLocalStorage = () => {
        return {
            expirationTime: Number(localStorage.getItem(Constants.AUTH_TOKEN_EXPIRATION_KEY)),
            issuedAt: new Date(localStorage.getItem(Constants.AUTH_TOKEN_ISSUED_DATETIME))
        }
    }

}