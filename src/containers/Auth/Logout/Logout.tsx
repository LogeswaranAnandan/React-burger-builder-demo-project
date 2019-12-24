import React from 'react';
import AuthActions from '../../../redux/action-creators/AuthActions';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import Constants from '../../../constants/constants';
import OrderActions from '../../../redux/action-creators/OrderActions';

interface IDispatchProps {
    logout(): void,
    resetBurgerBuilderState(): void
}

interface IProps extends IDispatchProps, RouteComponentProps {
}

class Logout extends React.Component<IProps, {}> {

    render() {
        return null;
    }

    componentDidMount() {
        this.props.logout();
        this.props.resetBurgerBuilderState();
        this.props.history.replace(Constants.URL.LANDING_PAGE);
    }

}

const mapDispatchToProps = (dispatch): IDispatchProps => {
    return {
        logout: () => dispatch(AuthActions.logout()),
        resetBurgerBuilderState: () => dispatch(OrderActions.resetBurgerBuilderState())
    }
}

export default connect(null, mapDispatchToProps)(Logout);