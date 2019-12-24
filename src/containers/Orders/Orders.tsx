import React, { Component } from "react";
import Order from "../../components/Orders/Order/Order";
import { IReduxState } from "../../models/Interface";
import { connect } from "react-redux";
import OrderActions from "../../redux/action-creators/OrderActions";

interface IMappedProps {
    userId: string,
    orders: any[]
}

interface IDispatchProps {
    fetchOrders: (userId) => void
}
interface IProps extends IMappedProps, IDispatchProps {
}

class Orders extends Component<IProps, {}> {

    async componentDidMount() {
        this.props.fetchOrders(this.props.userId);
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

const mapStateToProps = (reduxState: IReduxState): IMappedProps => {
    return {
        userId: reduxState.authState.userId,
        orders: reduxState.ordersState.orders
    }
}

const mapDispatchToProps = (dispatch): IDispatchProps => {
    return {
        fetchOrders: (userId) => dispatch(OrderActions.fetchOrdersAsync(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);