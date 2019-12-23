import React, { Component } from 'react';
import classes from './ContactData.module.css';
import { Ingredients, IReduxState, InputFieldType } from '../../../models/Interface';
import { withRouter, RouterProps } from 'react-router';
import Button from '../../../components/UI/Button/Button';
import ButtonClasses from '../../../components/UI/Button/Button.module.css';
import Constants from '../../../constants/constants';
import Input from '../../../components/UI/Input/Input';
import { connect, DispatchProp } from 'react-redux';
import OrderActions from '../../../redux/action-creators/OrderActions';
import updateObject from '../../../util/update-object';
import checkFieldValidity from '../../../util/check-validity';

interface IMappedProps {
    ingredients: Ingredients,
    price: number
}

interface IProps extends IMappedProps, RouterProps, DispatchProp {
    ingredients: Ingredients,
    price: number,
    onOrderSubmit?: (orderData, history) => void
}

interface IState {
    contactForm: {
        name: InputFieldType,
        street: InputFieldType,
        zipCode: InputFieldType,
        country: InputFieldType,
        email: InputFieldType,
        deliveryMethod: InputFieldType
    },
    isValid: boolean
}

class ContactData extends Component<IProps, IState> {

    constructor(props) {
        super(props);
    }

    state: IState = {
        contactForm: {
            name: {
                inputType: Constants.INPUT_TYPE.INPUT,
                label: 'Name',
                htmlProperties: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                errorMessage: Constants.ERROR_MESSAGE.REQUIRED
            },
            street: {
                inputType: Constants.INPUT_TYPE.INPUT,
                label: 'Street',
                htmlProperties: {
                    type: 'text',
                    placeholder: 'Your Address',
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                errorMessage: Constants.ERROR_MESSAGE.REQUIRED
            },
            zipCode: {
                inputType: Constants.INPUT_TYPE.INPUT,
                label: 'Zipcode',
                htmlProperties: {
                    type: 'number',
                    placeholder: 'Your Zipcode',
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 4,
                    maxLength: 6
                },
                isValid: false,
                isTouched: false,
                errorMessage: Constants.ERROR_MESSAGE.REQUIRED
            },
            country: {
                inputType: Constants.INPUT_TYPE.INPUT,
                label: 'Country',
                htmlProperties: {
                    type: 'text',
                    placeholder: 'Your Country',
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                errorMessage: Constants.ERROR_MESSAGE.REQUIRED
            },
            email: {
                inputType: Constants.INPUT_TYPE.INPUT,
                label: 'Email',
                htmlProperties: {
                    type: 'email',
                    placeholder: 'Your email',
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                isTouched: false,
                errorMessage: Constants.ERROR_MESSAGE.REQUIRED
            },
            deliveryMethod: {
                inputType: Constants.INPUT_TYPE.SELECT,
                label: 'Delivery Method',
                htmlProperties: {
                    options: [
                        { displayName: 'Please select a delivery method', value: '' },
                        { displayName: 'Membership', value: 'membership' },
                        { displayName: 'Normal', value: 'normal' }
                    ]
                },
                value: '',
                validationRules: {},
                isValid: false,
                isTouched: false,
                errorMessage: Constants.ERROR_MESSAGE.REQUIRED
            }
        },
        isValid: false
    }

    markInputAsTouched = (inputName: string, event) => {
        const updatedContactForm = updateObject(this.state.contactForm, {
            [inputName]: updateObject(this.state.contactForm[inputName], {
                    isTouched: true
                } as InputFieldType)
        });

        this.setState({
            contactForm: updatedContactForm
        });
    }

    inputChangedHandler = (inputName: string, event) => {
        const updatedFieldValue = event.target.value;
        let isFormValid = true;
        let isValid = null;
        let errorMessage = checkFieldValidity(this.state.contactForm[inputName].validationRules, updatedFieldValue);

        if (!errorMessage) {
            isValid = true;
            for (let key in this.state.contactForm) {
                if (key !== inputName && !this.state.contactForm[key].isValid) {
                    isFormValid = false;
                    break;
                }
            }
        } else {
            isValid = false;
            isFormValid = false;
        }

        const updatedInputField = updateObject(this.state.contactForm[inputName] as InputFieldType, {
            value: updatedFieldValue,
            isValid: isValid,
            errorMessage: errorMessage
        } as InputFieldType);

        const updatedContactForm = updateObject(this.state.contactForm, {
            [inputName]: updatedInputField
        });

        this.setState({
            contactForm: updatedContactForm,
            isValid: isFormValid
        });
    }

    submitOrder = async (event?: any) => {
        event.preventDefault();

        let contactInfo = {};
        for (let key in this.state.contactForm) {
            contactInfo[key] = this.state.contactForm[key].value;
        }

        const requestBody = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            contactInfo: contactInfo
        }

        this.props.onOrderSubmit(requestBody, this.props.history);
    }

    render() {

        let inputElementsArray = [];

        for (let key in this.state.contactForm) {
            let inputElProperties: InputFieldType = this.state.contactForm[key];
            inputElementsArray.push(
                <Input
                    key={key}
                    id={key}
                    inputType={inputElProperties.inputType}
                    label={inputElProperties.label}
                    value={inputElProperties.value}
                    htmlProperties={inputElProperties.htmlProperties}
                    isValid={inputElProperties.isValid}
                    isTouched={inputElProperties.isTouched}
                    errorMessage={inputElProperties.errorMessage}
                    onChangeHandler={this.inputChangedHandler}
                    onBlurHandler={this.markInputAsTouched}
                />
            )
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    {inputElementsArray}
                    <Button type={ButtonClasses.Success} handler={this.submitOrder} isDisabled={!this.state.isValid}>ORDER</Button>
                </form>
            </div>
        );
    }

}

const mapStateToProps = (reduxState: IReduxState): IMappedProps => {
    return {
        ingredients: reduxState.burgerBuilderState.ingredients,
        price: reduxState.burgerBuilderState.burgerPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderSubmit: (orderData, routeHistory) => dispatch(OrderActions.placeOrderAsync(orderData, routeHistory))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));