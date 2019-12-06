import axios, { AxiosRequestConfig } from 'axios';
import AppError from '../../models/AppError';
import Constants from '../../constants/constants';
import { EventEmitter } from 'events';

export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export default class HttpUtilService {

    public static count = 0;
    public static httpCountEvenEmitter = new EventEmitter();

    public static backendBaseUrl = Constants.BACKEND_BASE_URL;

    static async makeRequest(requestUrl: string, requestMethod: RequestMethods,
        requestBody?: any, hideSpinner?: boolean) {
        // let params = new HttpParams();

        // requestHeaders = requestHeaders || new HttpHeaders();
        // if (!requestHeaders.get('Content-Type')) {
        //     requestHeaders = requestHeaders.append('Content-Type', 'application/json');
        // }
        let httpRequestConfig: AxiosRequestConfig = {
            method: requestMethod,
            url: this.backendBaseUrl + requestUrl
        };
        if (requestBody) {
            httpRequestConfig.data = requestBody;
        }
        console.debug(`HTTP REQUEST : `, httpRequestConfig);

        // Showing the spinner component
        if (!hideSpinner) {
            this.httpCountEvenEmitter.emit(Constants.SPINNER_EVENT_NAME,++this.count);
        }
        try {
            const response: any = await axios.request(httpRequestConfig)
                .then(res => {
                    this.httpCountEvenEmitter.emit(Constants.SPINNER_EVENT_NAME,--this.count);
                    return res
                })
                .catch(err => {
                    this.httpCountEvenEmitter.emit(Constants.SPINNER_EVENT_NAME,--this.count);
                    Promise.reject(err);
                })
            console.debug(`Response: `, response);

            // Hiding the spinner component
            // if (!hideSpinner) {
            //     this.spinnerService.hideSpinner();
            // }

            if (response.data) {
                return response.data;
            } else {
                return Promise.reject(response);
            }
        } catch (err) {
            // Hiding the spinner component
            // if (!hideSpinner) {
            //     this.spinnerService.hideSpinner();
            // }

            const errorResponse: AppError = this.handleHttpError(err);
            return Promise.reject(errorResponse);
        }
    }

    private static handleHttpError(err: any): AppError {
        if (err.status === 400) {
            return this.handleError('ERR_BAD_REQUEST', 'Bad request format to server');
        } else if (err.status === 401) {
            return this.handleError('ERR_UNAUTHORIZED', 'Unauthorized request');
        } else if (err.status === 403) {
            return this.handleError('ERR_FORBIDDEN', 'Forbidden Request');
        } else if (err.status === 404) {
            return this.handleError('ERR_PAGE_NOT_FOUND', 'Page Not Found');
        } else if (err.status === 500) {
            return this.handleError('ERR_INTERNAL_SERVER_ERROR', 'Internal Server Error');
        } else {
            return this.handleError('ERR_BACK_END_ERROR', 'Error while contacting the Server');
        }
    }

    private static handleError(code: string, description: string): AppError {
        return new AppError(code, description);
    }
}