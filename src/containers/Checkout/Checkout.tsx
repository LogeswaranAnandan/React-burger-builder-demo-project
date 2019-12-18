import React, { Component } from 'react';
import { IReduxState, IReduxBurgerBuilderState } from '../../models/Interface';
import { RouteComponentProps, Route, Redirect } from 'react-router';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';

interface IProps extends IReduxBurgerBuilderState, RouteComponentProps {
}

class Checkout extends Component<IProps, {}> {

    goToContactDataPage = () => {
        this.props.history.push(this.props.match.url + "/contact-data");
    }

    goToBurgerBuilderPage = () => {
        this.props.history.push('/');
    }

    render() {
        let renderContent = (
            <Redirect to="/" />
        )
        if (this.props.ingredients) {
            renderContent = (
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
        return renderContent;
    }
}

const mapStateToProps = (reduxState: IReduxState) => {
    return reduxState.burgerBuilderState;
}

export default connect(mapStateToProps)(Checkout);