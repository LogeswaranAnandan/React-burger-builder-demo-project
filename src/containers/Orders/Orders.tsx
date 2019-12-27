import React, { Component } from "react";
import Order from "../../components/Orders/Order/Order";
import { IReduxState } from "../../models/Interface";
import { connect } from "react-redux";
import OrderActions from "../../redux/action-creators/OrderActions";
import OrderModel from "../../models/Order";
import updateObject from "../../util/update-object";
import OrderDetails from "../../components/Orders/OrderDetails/OrderDetails";

interface IMappedProps {
    userId: string,
    orders: any[]
}

interface IDispatchProps {
    fetchOrders: (userId) => void
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
        this.props.fetchOrders(this.props.userId);
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
        if (this.state.selectedOrder) {
            renderComponent = (
                <OrderDetails
                    order={this.state.selectedOrder}
                    backBtnHandler={this.hideOrderDetailsComponent}
                />
            );
        } else {
            renderComponent = this.props.orders.map((order) => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                        orderDetails={order}
                        clickHandler={this.showOrderDetailsComponent}
                    />
                )
            })
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
        orders: reduxState.ordersState.orders
    }
}

const mapDispatchToProps = (dispatch): IDispatchProps => {
    return {
        fetchOrders: (userId) => dispatch(OrderActions.fetchOrdersAsync(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);