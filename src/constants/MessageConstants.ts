export default class MessageConstants {
    public static ERROR_MSG = {
        ERR_LOGIN: "Invalid Username or Password",
        ERR_SIGNUP: "The email id already exists",
        ERR_PLACE_ORDER: "Unable to place order. Please try again later!!!",
        ERR_FETCH_ORDERS: "Unable to fetch Orders. Please try again later!!!",
        ERR_FETCH_INGREDIENTS: "Unable to fetch ingredients. Please try again later!!!"
    }

    public static SUCCESS_MSG = {
        SIGNUP: "The user has been registered successfully",
        PLACE_ORDER: "The Order has been placed successfully"
    }
}