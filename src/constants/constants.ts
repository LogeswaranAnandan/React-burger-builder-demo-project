export default class Constants {

    public static BACKEND_BASE_URL = 'https://burger-builder-3e20f.firebaseio.com/';
    public static SPINNER_EVENT_NAME = 'Spinner';
    public static AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';
    public static AUTH_USER_ID = 'AUTH_USER_ID';
    public static AUTH_TOKEN_EXPIRATION_KEY = 'AUTH_TOKEN_EXPIRATION_KEY';
    public static AUTH_TOKEN_ISSUED_DATETIME = 'AUTH_TOKEN_ISSUED_DATETIME';

    public static MEAT = 'meat';
    public static CHEESE = 'cheese';
    public static SALAD = 'salad';
    public static BACON = 'bacon';
    public static BREAD_TOP = 'bread-top';
    public static BREAD_BOTTOM = 'bread-bottom';

    public static LOGIN_PAGE = 'Login';
    public static SIGNUP_PAGE = 'Signup'

    public static AVAILABLE_INGREDIENTS = [Constants.SALAD, Constants.BACON, Constants.CHEESE, Constants.MEAT];

    public static INGREDIENTS_COST = {
        salad : 5,
        bacon: 10,
        cheese: 15,
        meat: 20
    }

    public static GET_ORDERS_URL = 'Orders.json';


    public static INPUT_TYPE = {
        INPUT: 'input',
        SELECT: 'select'
    }

    public static VALIDATION_RULES = {
        REQUIRED: 'required',
        MIN_LENGTH: 'minLength',
        MAX_LENGTH: 'maxLength'
    }

    public static ERROR_MESSAGE = {
        REQUIRED: 'This field is required.',
        MIN_LENGTH: 'This field should contain minimum of 4 characters.',
        MAX_LENGTH: 'This field should contain maximum of 6 characters.'
    }

    public static URL = {
        LANDING_PAGE: '/dashboard',
        BURGER_BUILDER_PAGE: '/dashboard',
        CHECKOUT_PAGE: '/checkout',
        CONTACT_DATA_PAGE: '/contact-data',
        ORDERS_PAGE: '/orders',
        LOGIN_PAGE: '/auth',
        LOGOUT_PAGE: '/logout'
    }

}