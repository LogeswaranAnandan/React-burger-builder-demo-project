import React, { Component } from "react";
import Order from "../../components/Orders/Order/Order";
import { IReduxState } from "../../models/Interface";
import { connect } from "react-redux";
import OrderActions from "../../redux/action-creators/OrderActions";

interface IProps {
    orders: any[],
    fetchOrders: () => void
}

class Orders extends Component<IProps, {}> {

    async componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        let orders = this.props.orders.map((order) => {
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

const mapStateToProps = (reduxState: IReduxState) => {
    return reduxState.ordersState
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: () => dispatch(OrderActions.fetchOrdersAsync())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);