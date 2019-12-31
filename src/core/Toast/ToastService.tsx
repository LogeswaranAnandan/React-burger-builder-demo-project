import React from "react";
import { toast, ToastOptions } from "react-toastify";
import ToastComponent from "../../components/UI/Toast/ToastComponent";
import { ToastType } from "../../models/enum";

export default class ToastService {
    static createToast = (toastType: ToastType, toastMessage: any, options?: ToastOptions) => {
        const toastComponent = <ToastComponent title={toastType} message={toastMessage} />;
        switch (toastType) {
            case ToastType.SUCCESS:
                toast.success(toastComponent, options);
                break;
            case ToastType.ERROR:
                toast.error(toastComponent, options);
                break;
            case ToastType.INFO:
                toast.info(toastComponent, options);
                break;
            case ToastType.WARNING:
                toast.info(toastComponent, options);
                break;
            default:
                toast(toastComponent, options);
                break;
        }
    }
}