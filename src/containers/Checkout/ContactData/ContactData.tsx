import React, { Component } from 'react';
import classes from './ContactData.module.css';
import HttpUtilService, { RequestMethods } from '../../../core/HttpUtil/HttpUtilService';
import { Ingredients } from '../../../models/Interface';
import { withRouter, RouterProps } from 'react-router';
import Button from '../../../components/UI/Button/Button';
import ButtonClasses from '../../../components/UI/Button/Button.module.css';
import Constants from '../../../constants/constants';
import Input from '../../../components/UI/Input/Input';

interface IProps extends RouterProps {
    ingredients: Ingredients,
    price: number
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

interface InputFieldType {
    inputType: string,
    label: string,
    htmlProperties: {
        type?: 'text' | 'password' | 'email' | 'number',
        placeholder?: string,
        options?: { displayName: string, value: any }[]
    },
    value: any,
    validationRules: ValidationRules
    isValid: boolean,
    isTouched: boolean,
    errorMessage: string
}

interface ValidationRules {
    required?: boolean,
    minLength?: number,
    maxLength?: number
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
        let updatedContactForm = { ...this.state.contactForm };
        let updatedInputField: InputFieldType = { ...updatedContactForm[inputName] };
        updatedInputField.isTouched = true;
        updatedContactForm[inputName] = updatedInputField;
        this.setState({
            contactForm: updatedContactForm
        });
    }

    inputChangedHandler = (inputName: string, event) => {
        const updatedFieldValue = event.target.value;
        let isFormValid = true;

        let updatedContactForm = { ...this.state.contactForm };
        let updatedInputField: InputFieldType = { ...updatedContactForm[inputName] };
        updatedInputField.value = updatedFieldValue;
        const errorMessage = this.checkFieldValidity(updatedInputField.validationRules, updatedFieldValue);
        if (!errorMessage) {
            updatedInputField.isValid = true;
            for (let key in updatedContactForm) {
                if (key !== inputName && !updatedContactForm[key].isValid) {
                    isFormValid = false;
                    break;
                }
            }
        } else {
            updatedInputField.isValid = false;
            updatedInputField.errorMessage = errorMessage;
            isFormValid = false;
        }
        updatedContactForm[inputName] = updatedInputField;
        this.setState({
            contactForm: updatedContactForm,
            isValid: isFormValid
        });
    }

    checkFieldValidity(rules: ValidationRules, value: string) {
        // let isValid = true;
        let errorMessage = null;
        for (let rule in rules) {
            if (!errorMessage) {
                switch (rule) {
                    case Constants.VALIDATION_RULES.REQUIRED:
                        if (value.toString().trim() === '') {
                            // isValid = false;
                            errorMessage = Constants.ERROR_MESSAGE.REQUIRED
                        }
                        break;
                    case Constants.VALIDATION_RULES.MIN_LENGTH:
                        if (value.toString().trim().length < rules[rule]) {
                            // isValid = false;
                            errorMessage = Constants.ERROR_MESSAGE.MIN_LENGTH
                        }
                        break;
                    case Constants.VALIDATION_RULES.MAX_LENGTH:
                        if (value.toString().trim().length > rules[rule]) {
                            // isValid = false;
                            errorMessage = Constants.ERROR_MESSAGE.MAX_LENGTH
                        }
                        break;
                    default:
                        // isValid = false;
                        errorMessage = Constants.ERROR_MESSAGE.REQUIRED
                        break;
                }
            }
        }
        return errorMessage;
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
        await HttpUtilService.makeRequest('/Orders.json', RequestMethods.POST, requestBody);
        this.props.history.push("/");
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

export default withRouter(ContactData);