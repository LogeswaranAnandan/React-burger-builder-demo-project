import React, { Component } from 'react';
import classes from './ContactData.module.css';
import HttpUtilService, { RequestMethods } from '../../../core/HttpUtil/HttpUtilService';
import { Ingredients } from '../../../models/Interface';
import { withRouter, RouterProps } from 'react-router';
import Button from '../../../components/UI/Button/Button';
import ButtonClasses from '../../../components/UI/Button/Button.module.css';

interface IProps extends RouterProps {
    ingredients: Ingredients,
    price: number
}

interface IState {
    name: string,
    email: string,
    address: {
        street: string,
        postalCode: number
    }
}

class ContactData extends Component<IProps, IState> {

    constructor(props) {
        super(props);
        console.log('props', this.props);
    }

    submitOrder = async (event?: any) => {
        event.preventDefault();
        const requestBody = {
            ingredients: this.props.ingredients,
            price: this.props.price
        }
        await HttpUtilService.makeRequest('/Orders.json', RequestMethods.POST, requestBody);
        this.props.history.push("/");
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button type={ButtonClasses.Success} handler={this.submitOrder}>ORDER</Button>
            </form>
            </div>
        );
    }

}

export default withRouter(ContactData);