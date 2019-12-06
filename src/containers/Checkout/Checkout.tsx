import React, { Component } from 'react';
import { Ingredients } from '../../models/Interface';
import { RouteComponentProps, Route } from 'react-router';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';

interface IState {
    ingredients: Ingredients,
    price: number
}

class Checkout extends Component<RouteComponentProps, IState> {

    constructor(props: RouteComponentProps) {
        super(props);
        let ingredients: Ingredients = {} as any;
        let price: number = 0;
        const uriQueryParams = new URLSearchParams(decodeURIComponent(this.props.location.search));
        uriQueryParams.forEach((value, key) => {
            if (key.toLowerCase() !== 'price') {
                ingredients[key] = value;
            } else {
                price = Number(value);
            }
        });
        this.state = {
            ingredients: ingredients,
            price: price
        }
    }

    goToContactDataPage = () => {
        this.props.history.push(this.props.match.url + "/contact-data");
    }

    goToBurgerBuilderPage = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    price={this.state.price}
                    continueHandler={this.goToContactDataPage}
                    cancelHandler={this.goToBurgerBuilderPage}
                />
                <Route
                    path={this.props.match.url + "/contact-data"}
                    render={() => <ContactData ingredients={this.state.ingredients} price={this.state.price} />}
                />
            </div>
        );
    }


}

export default Checkout;