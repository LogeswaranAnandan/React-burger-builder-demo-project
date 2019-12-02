import React, { Component } from "react";
import HttpUtilService from "../../../core/HttpUtil/HttpUtilService";
import classes from "./Spinner.module.css";
import Constants from "../../../constants/constants";

interface IState {
    showSpinner: boolean
}

class Spinner extends Component<{}, IState> {

    state = {
        showSpinner: false
    }

    constructor(props) {
        super(props);
        HttpUtilService.httpCountEvenEmitter.addListener(Constants.SPINNER_EVENT_NAME, (count) => {
            this.setState({ showSpinner: Number(count) > 0 });
        });
    }

    render() {
        let spinner = null;
        if (this.state.showSpinner) {
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
}

export default Spinner