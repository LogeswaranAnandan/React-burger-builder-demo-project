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
            this.httpCountEvenEmitter.emit(Constants.SPINNER_EVENT_NAME, ++this.count);
        }

        try {
            const response: any = await axios.request(httpRequestConfig);
            console.debug(`Response: `, response);
            this.httpCountEvenEmitter.emit(Constants.SPINNER_EVENT_NAME, --this.count);
            if (response.data) {
                return response.data;
            } else {
                return Promise.reject(response);
            }
        } catch (error) {
            console.debug(`ERROR: `, error.response);
            this.httpCountEvenEmitter.emit(Constants.SPINNER_EVENT_NAME, --this.count);
            const errorResponse: AppError = this.handleHttpError(error.response.status);
            return Promise.reject(errorResponse);
        }
    }

    static async makeRequestToExternalUrl(requestUrl: string, requestMethod: RequestMethods,
        requestBody?: any, hideSpinner?: boolean) {
        // let params = new HttpParams();

        // requestHeaders = requestHeaders || new HttpHeaders();
        // if (!requestHeaders.get('Content-Type')) {
        //     requestHeaders = requestHeaders.append('Content-Type', 'application/json');
        // }
        let httpRequestConfig: AxiosRequestConfig = {
            method: requestMethod,
            url: requestUrl
        };
        if (requestBody) {
            httpRequestConfig.data = requestBody;
        }
        console.debug(`HTTP REQUEST : `, httpRequestConfig);

        // Showing the spinner component
        if (!hideSpinner) {
            this.httpCountEvenEmitter.emit(Constants.SPINNER_EVENT_NAME, ++this.count);
        }
        try {
            const response: any = await axios.request(httpRequestConfig);
            this.httpCountEvenEmitter.emit(Constants.SPINNER_EVENT_NAME, --this.count);
            console.debug(`Response: `, response);

            if (response.data) {
                return response.data;
            } else {
                return Promise.reject(response);
            }
        } catch (error) {
            console.debug(`ERROR: `, error.response);
            this.httpCountEvenEmitter.emit(Constants.SPINNER_EVENT_NAME, --this.count);
            const errorResponse: AppError = this.handleHttpError(error.response);
            return Promise.reject(errorResponse);
        }
    }

    private static handleHttpError(statusCode: number): AppError {
        if (statusCode === 400) {
            return this.handleError('ERR_BAD_REQUEST', 'Bad request format to server');
        } else if (statusCode === 401) {
            return this.handleError('ERR_UNAUTHORIZED', 'Unauthorized request');
        } else if (statusCode === 403) {
            return this.handleError('ERR_FORBIDDEN', 'Forbidden Request');
        } else if (statusCode === 404) {
            return this.handleError('ERR_PAGE_NOT_FOUND', 'Page Not Found');
        } else if (statusCode === 500) {
            return this.handleError('ERR_INTERNAL_SERVER_ERROR', 'Internal Server Error');
        } else {
            return this.handleError('ERR_BACK_END_ERROR', 'Error while contacting the Server');
        }
    }

    private static handleError(code: string, description: string): AppError {
        return new AppError(code, description);
    }
}