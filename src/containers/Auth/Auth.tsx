import React, { Component } from 'react';
import * as lodash from 'lodash';
import { InputFieldType, IReduxState } from '../../models/Interface';
import Constants from '../../constants/constants';
import Input from '../../components/UI/Input/Input';
import checkFieldValidity from '../../util/check-validity';
import updateObject from '../../util/update-object';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import ButtonClasses from '../../components/UI/Button/Button.module.css';
import HttpUtilService, { RequestMethods } from '../../core/HttpUtil/HttpUtilService';
import UrlConstants from '../../constants/url-constants';
import AuthActions from '../../redux/action-creators/AuthActions';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
    isAuthenticated: boolean,
    onLoginSuccess(loginResponse: any): void,
    onSignupSuccess(signupResponse: any): void,
    redirectPath: string,
    clearRedirectPath(): void
}

interface IState {
    authForm: {
        email: InputFieldType,
        password: InputFieldType
    },
    isAuthFormValid: boolean,
    formMode: 'Login' | 'Signup'
}

const initialState: IState = {
    authForm: {
        email: {
            inputType: Constants.INPUT_TYPE.INPUT,
            label: 'Email',
            htmlProperties: {
                type: 'text',
                placeholder: 'Your Email',
            },
            value: '',
            validationRules: {
                required: true
            },
            isValid: false,
            isTouched: false,
            errorMessage: Constants.ERROR_MESSAGE.REQUIRED
        },
        password: {
            inputType: Constants.INPUT_TYPE.INPUT,
            label: 'Password',
            htmlProperties: {
                type: 'password',
                placeholder: 'Enter your password',
            },
            value: '',
            validationRules: {
                required: true,
                minLength: 4,
                maxLength: 10
            },
            isValid: false,
            isTouched: false,
            errorMessage: Constants.ERROR_MESSAGE.REQUIRED
        }
    },
    isAuthFormValid: false,
    formMode: 'Login'
}


class Auth extends Component<IProps, IState> {

    state: IState = lodash.cloneDeep(initialState);

    inputChangedHandler = (inputName: string, event) => {
        const updatedFieldValue = event.target.value;
        let isFormValid = true;
        let isValid = null;
        let errorMessage = checkFieldValidity(this.state.authForm[inputName].validationRules, updatedFieldValue);

        if (!errorMessage) {
            isValid = true;
            for (let key in this.state.authForm) {
                if (key !== inputName && !this.state.authForm[key].isValid) {
                    isFormValid = false;
                    break;
                }
            }
        } else {
            isValid = false;
            isFormValid = false;
        }

        const updatedInputField = updateObject(this.state.authForm[inputName] as InputFieldType, {
            value: updatedFieldValue,
            isValid: isValid,
            errorMessage: errorMessage
        } as InputFieldType);

        const updatedAuthForm = updateObject(this.state.authForm, {
            [inputName]: updatedInputField
        });

        this.setState({
            authForm: updatedAuthForm,
            isAuthFormValid: isFormValid
        });
    }

    markInputAsTouched = (inputName: string, event) => {
        const updatedField = updateObject(this.state.authForm[inputName], {
            isTouched: true
        } as InputFieldType)

        const updatedAuthForm = updateObject(this.state.authForm, {
            [inputName]: updatedField
        });

        this.setState({
            authForm: updatedAuthForm
        });
    }

    markAllInputsAsTouched = () => {
        let updatedAuthForm = {};
        for (let key in this.state.authForm) {
            updatedAuthForm[key] = updateObject(this.state.authForm[key], {
                isTouched: true
            } as InputFieldType);
        }

        this.setState({
            authForm: updatedAuthForm as any
        });
    }

    switchAuthFormMode = () => {
        const updatedFormMode = this.state.formMode === 'Login' ? 'Signup' : 'Login';
        const updatedState = updateObject(lodash.cloneDeep(initialState), {
            formMode: updatedFormMode
        } as IState)
        this.setState(updatedState);
    }

    submitOrder = async (event?: any) => {
        event.preventDefault();

        if (!this.state.isAuthFormValid) {
            this.markAllInputsAsTouched();
            return;
        }

        let formInfo = {};
        for (let key in this.state.authForm) {
            formInfo[key] = this.state.authForm[key].value;
        }
        formInfo['returnSecureToken'] = true;

        if (this.state.formMode === 'Login') {
            try {
                const response = await HttpUtilService.makeRequestToExternalUrl(UrlConstants.LOGIN_URL, RequestMethods.POST, formInfo);
                this.props.onLoginSuccess(response);
                const redirectPath = this.props.redirectPath;
                this.props.clearRedirectPath();
                this.props.history.replace(redirectPath);
            } catch (err) {
                console.log('ERR_LOGIN', err);
            }
        } else {
            try {
                const response = await HttpUtilService.makeRequestToExternalUrl(UrlConstants.SIGNUP_URL, RequestMethods.POST, formInfo);
                this.props.onSignupSuccess(response);
                const redirectPath = this.props.redirectPath;
                this.props.clearRedirectPath();
                this.props.history.replace(redirectPath);
            } catch (err) {
                console.log('ERR_SIGNUP', err);
            }
        }
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.replace(Constants.URL.LANDING_PAGE);
        }
    }


    render() {
        let inputElementsArray = [];

        for (let key in this.state.authForm) {
            let inputElProperties: InputFieldType = this.state.authForm[key];
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
            <div className={classes.AuthData}>
                <h4 className={classes.AuthHeading}>WELCOME TO {this.state.formMode.toUpperCase()}!!!</h4>
                <form>
                    {inputElementsArray}
                    <Button type={ButtonClasses.Success} handler={this.submitOrder}>{this.state.formMode}</Button>
                </form>
                <div>
                    <Button type={ButtonClasses.Danger} handler={this.switchAuthFormMode}>
                        Switch to {this.state.formMode === 'Login' ? 'Signup' : 'Login'}
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxState: IReduxState) => {
    return {
        isAuthenticated: reduxState.authState.isAuthenticated,
        redirectPath: reduxState.authState.redirectPath
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginSuccess: (loginResponse) => dispatch(AuthActions.loginSuccess(loginResponse)),
        onSignupSuccess: (signupResponse) => dispatch(AuthActions.signupSuccess(signupResponse)),
        clearRedirectPath: () => dispatch(AuthActions.clearRedirectPath())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);