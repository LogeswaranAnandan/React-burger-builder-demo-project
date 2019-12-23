import React from 'react';
import AuthActions from '../../../redux/action-creators/AuthActions';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import Constants from '../../../constants/constants';

interface IDispatchProps {
    logout(): void
}

interface IProps extends IDispatchProps, RouteComponentProps {
}

class Logout extends React.Component<IProps, {}> {

    render() {
        return null;
    }

    componentDidMount() {
        this.props.logout();
        this.props.history.replace(Constants.URL.LANDING_PAGE);
    }

}

const mapDispatchToProps = (dispatch): IDispatchProps => {
    return {
        logout: () => dispatch(AuthActions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);