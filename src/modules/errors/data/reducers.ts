import { Action, createAction, handleActions } from 'redux-actions';
import { toCollection } from '~/modules/backend';
import { Dispatch } from '~/modules/store/shared';

type Module = 'application';

export type ErrorsState = {
    [module in Module]: {
        title: string;
        message: string;
        error: string;
        info: ErrorInfo;
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

export type ErrorPayload = {
    error: string;
    message?: string;
    module: Module;
    title?: string;
    info: ErrorInfo;
};

export type ClearErrorPayload = {
    module: Module;
};

export interface ErrorsActions {
    setError(payload: ErrorPayload): Action<ErrorPayload>;
    clearError(module: Module): Action<ClearErrorPayload>;
    networkError(
        module: Module,
        error?: string,
        message?: string,
        title?: string,
        info?: ErrorInfo,
    ): (dispatch: Dispatch<WithErrorsState>) => void;
    requestError(
        module: string,
        error?: string,
        message?: string,
        title?: string,
        info?: ErrorInfo,
    ): (dispatch: Dispatch<WithErrorsState>) => void;
    applicationError(
        module: Module,
        error?: string,
        message?: string,
        title?: string,
        info?: ErrorInfo,
    ): (dispatch: Dispatch<WithErrorsState>) => void;
}

const asyncAction = (defaultMessage: string, defaultTitle: string) => (
    module: Module,
    error?: string,
    message?: string,
    title?: string,
    info?: ErrorInfo,
) => (dispatch: Dispatch<WithErrorsState>) => {
    const payload: ErrorPayload = {
        module,
        message: message || defaultMessage,
        title: title || defaultTitle,
        error,
        info,
    };
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    dispatch(errorsActions.setError(payload));
    toCollection('errors').add({
        ...payload,
        device,
        ...reportPayload,
    });
};

export const errorsActions: ErrorsActions = {
    setError: createAction('SET_ERROR'),
    clearError: createAction('CLEAR_ERROR', (module: Module) => ({ module })),
    networkError: asyncAction('An Error occurred during network request - try to relaunch app', 'Network Error'),
    requestError: asyncAction('An Error occurred during request - please try again later', 'Request Error'),
    applicationError: asyncAction('An Error occurred - please try again later', 'Application Error'),
};

type PossiblePayloads = ErrorPayload | ClearErrorPayload;

export const errorsReducer = handleActions<ErrorsState, PossiblePayloads>(
    {
        [errorsActions.setError.toString()]: (
            state,
            { payload: { module, message, title, error, info } }: Action<ErrorPayload>,
        ): ErrorsState => ({
            ...state,
            [module]: { message, title, error, info },
        }),
        [errorsActions.clearError.toString()]: (state, { payload: { module } }): ErrorsState => ({
            ...state,
            [module]: null,
        }),
    },
    errorsDefaultState,
);

export function reduxErrorHandler(
    error: Error,
    getState: Function,
    lastAction: Action<unknown>,
    dispatch: Dispatch<WithErrorsState>,
): void {
    dispatch(errorsActions.applicationError('application', error.toString()));
}
