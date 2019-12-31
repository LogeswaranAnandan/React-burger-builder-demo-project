import React, { Component } from "react";
import Order from "../../components/Orders/Order/Order";
import { IReduxState } from "../../models/Interface";
import { connect } from "react-redux";
import OrderActions from "../../redux/action-creators/OrderActions";
import OrderModel from "../../models/Order";
import updateObject from "../../util/update-object";
import OrderDetails from "../../components/Orders/OrderDetails/OrderDetails";
import classes from './Orders.module.css';

interface IMappedProps {
    userId: string,
    authToken: string,
    orders: any[]
}

interface IDispatchProps {
    fetchOrders: (userId, authToken) => void
}
interface IProps extends IMappedProps, IDispatchProps {
}

interface IState {
    selectedOrder: any
}

class Orders extends Component<IProps, IState> {

    state: IState = {
        selectedOrder: null
    }

    async componentDidMount() {
        this.props.fetchOrders(this.props.userId, this.props.authToken);
    }

    showOrderDetailsComponent = (order: OrderModel) => {
        const updatedState = updateObject(this.state, {
            selectedOrder: order
        } as IState);
        this.setState(updatedState);
    }

    hideOrderDetailsComponent = () => {
        const updatedState = updateObject(this.state, {
            selectedOrder: null
        } as IState);
        this.setState(updatedState);
    }

    render() {
        let renderComponent = null;
        if (this.props.orders.length > 0) {
            if (this.state.selectedOrder) {
                renderComponent = (
                    <OrderDetails
                        order={this.state.selectedOrder}
                        backBtnHandler={this.hideOrderDetailsComponent}
                    />
                );
            } else {
                const orderArray = this.props.orders.map((order) => {
                    return (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                            orderDetails={order}
                            clickHandler={this.showOrderDetailsComponent}
                        />
                    )
                });
                renderComponent = [];
                // Sorting the orders to display the latest order at top
                for(let i=orderArray.length - 1; i >= 0; i--) {
                    renderComponent.push(orderArray[i]);
                }
            }
        } else {
            renderComponent = (
                <div className={classes.ErrorMsgContainer}>
                    The list is currently empty. Please place an order to view them here!!!
                </div>
            )
        }
        return (
            <div>
                {renderComponent}
            </div>
        );
    }
}

const mapStateToProps = (reduxState: IReduxState): IMappedProps => {
    return {
        userId: reduxState.authState.userId,
        authToken: reduxState.authState.authToken,
        orders: reduxState.ordersState.orders
    }
}

const mapDispatchToProps = (dispatch): IDispatchProps => {
    return {
        fetchOrders: (userId, authToken) => dispatch(OrderActions.fetchOrdersAsync(userId, authToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);