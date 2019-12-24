import React, { Component } from "react";
import HttpUtilService from "../../../core/HttpUtil/HttpUtilService";
import classes from "./Spinner.module.css";
import Constants from "../../../constants/constants";

interface IProps {
    showSpinnerAsFallback?: boolean
}

interface IState {
    showSpinner: boolean
}

class Spinner extends Component<IProps, IState> {

    state = {
        showSpinner: false
    }

    updateSpinnerState = (count: number) => {
        this.setState({ showSpinner: Number(count) > 0 });
    };

    constructor(props: IProps) {
        super(props);
        HttpUtilService.httpCountEvenEmitter.addListener(Constants.SPINNER_EVENT_NAME, this.updateSpinnerState);
    }

    render() {
        let spinner = null;
        if (this.state.showSpinner || this.props.showSpinnerAsFallback) {
            spinner = (
                <div className={classes.Backdrop}>
                    <div className={classes.Loader}></div>
                </div>
            );
        }
        return (
            <div>{spinner}</div>
        );
    }

    componentWillUnmount() {
        HttpUtilService.httpCountEvenEmitter.removeListener(Constants.SPINNER_EVENT_NAME, this.updateSpinnerState);
    }
}

export default Spinner