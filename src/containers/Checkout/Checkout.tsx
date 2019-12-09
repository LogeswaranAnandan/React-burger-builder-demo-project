import React, { Component } from 'react';
import { IReduxState } from '../../models/Interface';
import { RouteComponentProps, Route } from 'react-router';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';

interface IProps extends IReduxState,RouteComponentProps {
}

class Checkout extends Component<IProps, {}> {

    goToContactDataPage = () => {
        this.props.history.push(this.props.match.url + "/contact-data");
    }

    goToBurgerBuilderPage = () => {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    price={this.props.burgerPrice}
                    continueHandler={this.goToContactDataPage}
                    cancelHandler={this.goToBurgerBuilderPage}
                />
                <Route
                    path={this.props.match.url + "/contact-data"}
                    render={() => <ContactData ingredients={this.props.ingredients} price={this.props.burgerPrice} />}
                />
            </div>
        );
    }
}

const mapStateToProps = (reduxState: IReduxState) => {
    return reduxState;
}

export default connect(mapStateToProps)(Checkout);