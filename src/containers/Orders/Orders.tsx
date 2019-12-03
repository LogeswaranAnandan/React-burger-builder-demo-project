import React, { Component } from "react";
import HttpUtilService, { RequestMethods } from "../../core/HttpUtil/HttpUtilService";
import Constants from "../../constants/constants";
import Order from "../../components/Orders/Order/Order";

class Orders extends Component {

    state = {
        orders: []
    }

    async componentDidMount() {
        let orders = [];
        const unstructuredOrders = await HttpUtilService.makeRequest(Constants.GET_ORDERS_URL, RequestMethods.GET)
        console.log('orders', unstructuredOrders);
        for (let key in unstructuredOrders) {
            orders.push({ ...unstructuredOrders[key], id: key });
        }
        console.log('o', orders);
        this.setState({ orders: orders });
    }

    render() {
        let orders = this.state.orders.map((order) => {
            return (
                <Order
                    ingredients={order.ingredients}
                    price={order.price}
                    key={order.id}
                />
            )
        })
        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default Orders;