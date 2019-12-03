export default class Constants {

    public static BACKEND_BASE_URL = 'https://burger-builder-3e20f.firebaseio.com/';
    public static SPINNER_EVENT_NAME = 'Spinner';

    public static MEAT = 'meat';
    public static CHEESE = 'cheese';
    public static SALAD = 'salad';
    public static BACON = 'bacon';
    public static BREAD_TOP = 'bread-top';
    public static BREAD_BOTTOM = 'bread-bottom';

    public static AVAILABLE_INGREDIENTS = [Constants.SALAD, Constants.BACON, Constants.CHEESE, Constants.MEAT];

    public static INGREDIENTS_COST = {
        salad : 5,
        bacon: 10,
        cheese: 15,
        meat: 20
    }

    public static GET_ORDERS_URL = '/Orders.json';
}