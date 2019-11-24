import { Action } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { toCollection } from '~/modules/backend';
import { Dispatch } from '~/modules/store/shared';

type Module = 'application';

export type ErrorsState = {
    [module in Module]: {
        title: string;
        message: string;
        module: Module;
    };
};

export type WithErrorsState = {
    errors: ErrorsState;
};

export const errorsDefaultState: ErrorsState = {
    application: null,
};

export type ErrorInfo = {
    componentStack: string;
};

const device = {
    userAgent: window.navigator.userAgent,
};

const reportPayload = {
    dateTime: new Date().toString(),
};

export interface ErrorsActions {
    setError(payload: ErrorPayload): Action;
    clearError(module: Module): Action;
    networkError(
        module: Module,
        error?: string,
        message?: string,
        title?: string,
    ): (dispatch: Dispatch<WithErrorsState>) => void;
    requestError(
        module: string,
        error?: string,
        message?: string,
        title?: string,
    ): (dispatch: Dispatch<WithErrorsState>) => void;
    applicationError(
        info: ErrorInfo,
        module: Module,
        error?: string,
        message?: string,
        title?: string,
    ): (dispatch: Dispatch<WithErrorsState>) => void;
}

export const errorsActions: ErrorsActions = {
    setError: createAction('SET_ERROR'),
    clearError: createAction('CLEAR_ERROR', (module: Module) => ({ module })),
    networkError: (module: Module, error?: string, message?: string, title?: string) => (
        dispatch: Dispatch<WithErrorsState>,
    ) => {
        const payload: ErrorPayload = {
            module,
            message: message || 'An Error occurred during network request - try to relaunch app',
            title: title || 'Network Error',
            error,
            info: null,
        };
        dispatch(errorsActions.setError(payload));
        toCollection('errors').add({
            ...payload,
            device,
            ...reportPayload,
        });
    },
    requestError: (module: Module, error?: string, message?: string, title?: string) => (
        dispatch: Dispatch<WithErrorsState>,
    ) => {
        const payload: ErrorPayload = {
            module,
            message: message || 'An Error occurred during request - please try again later',
            title: title || 'Request Error',
            error,
            info: null,
        };
        dispatch(errorsActions.setError(payload));
        toCollection('errors').add({
            ...payload,
            device,
            ...reportPayload,
        });
    },
    applicationError: (info: ErrorInfo, module: Module, error?: string, message?: string, title?: string) => (
        dispatch: Dispatch<WithErrorsState>,
    ) => {
        const payload: ErrorPayload = {
            module,
            message: message || 'An Error occurred - please try again later',
            title: title || 'Application Error',
            error,
            info,
        };
        dispatch(errorsActions.setError(payload));
        toCollection('errors').add({
            ...payload,
            device,
            ...reportPayload,
        });
    },
};

export const errorsReducer = handleActions<ErrorsState, ErrorPayload>(
    {
        [errorsActions.setError.toString()]: (state, { payload: { module, message, title, error, info } }) => ({
            ...state,
            [module]: { message, title, module, error, info },
        }),
        [errorsActions.clearError.toString()]: (state, { payload: { module } }) => ({
            ...state,
            [module]: null,
        }),
    },
    errorsDefaultState,
);

export type ErrorPayload = {
    error: string;
    message?: string;
    module: Module;
    title?: string;
    info: ErrorInfo;
};

export function reduxErrorHandler(
    error: Error,
    getState: Function,
    lastAction: Action,
    dispatch: Dispatch<WithErrorsState>,
): void {
    dispatch(errorsActions.applicationError(null, 'application', error.toString()));
}
