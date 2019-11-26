import {
    asyncAction,
    device,
    ErrorInfo,
    ErrorPayload,
    ErrorsActions,
    errorsActions,
    errorsDefaultState,
    errorsReducer,
    ErrorsState,
    reduxErrorHandler,
    reportPayload,
} from '../data/reducers';
import { toCollection } from '~/modules/backend';
import { Action } from 'redux-actions';

jest.mock('~/modules/backend', () => ({
    toCollection: jest.fn(() => ({
        add: jest.fn(),
    })),
}));

describe('tests reducer and actions', () => {
    describe('reducer', () => {
        it('returns empty state', () => {
            expect(errorsReducer(undefined, { type: 'empty', payload: null })).toStrictEqual(errorsDefaultState);
        });
        it('set payload on setError action', () => {
            const message = 'message',
                title = 'title',
                error = 'error',
                info: ErrorInfo = null;
            const payload: ErrorPayload = {
                module: 'application',
                message,
                title,
                error,
                info,
            };
            expect(errorsReducer(errorsDefaultState, errorsActions.setError(payload))).toStrictEqual({
                ...errorsDefaultState,
                application: {
                    message,
                    title,
                    error,
                    info,
                },
            });
        });
        it('clears payload on clearError action', () => {
            const state: ErrorsState = {
                ...errorsDefaultState,
                application: {
                    title: 'title',
                    error: 'error',
                    message: 'message',
                    info: null,
                },
            };
            expect(errorsReducer(state, errorsActions.clearError('application'))).toStrictEqual(errorsDefaultState);
        });
    });
    describe('asyncAction', () => {
        it('sets default message & title to payload', () => {
            const spy = jest.spyOn(errorsActions, 'setError');
            const defaultMessage = 'default message',
                defaultTitle = 'default title',
                dispatch = jest.fn(),
                module = 'application',
                payload: ErrorPayload = {
                    module,
                    message: defaultMessage,
                    title: defaultTitle,
                    error: undefined,
                    info: undefined,
                };
            asyncAction(defaultMessage, defaultTitle)(module)(dispatch);
            expect(errorsActions.setError).toHaveBeenCalledWith(payload);
            expect(dispatch).toHaveBeenCalledWith({
                type: 'SET_ERROR',
                payload,
            });

            spy.mockRestore();
        });
        it('calls toCollection for errors collection', () => {
            const defaultMessage = 'default message',
                defaultTitle = 'default title',
                dispatch = jest.fn(),
                module = 'application',
                payload: ErrorPayload = {
                    module,
                    message: 'message',
                    title: 'title',
                    error: 'error',
                    info: {
                        componentStack: '1,2,3',
                    },
                };

            const add = jest.fn();
            (toCollection as jest.Mock).mockImplementation(() => ({ add }));
            asyncAction(defaultMessage, defaultTitle)(
                module,
                payload.error,
                payload.message,
                payload.title,
                payload.info,
            )(dispatch);

            expect(toCollection).toHaveBeenCalledWith('errors');
            expect(add).toHaveBeenCalledWith({
                ...payload,
                device,
                ...reportPayload,
            });
        });
    });
    describe('actions', () => {
        it('calls actions with appropriate default message & title', () => {
            const cases = [
                ['networkError', 'An Error occurred during network request - try to relaunch app', 'Network Error'],
                ['requestError', 'An Error occurred during request - please try again later', 'Request Error'],
                ['applicationError', 'An Error occurred - please try again later', 'Application Error'],
            ];
            const module = 'application';
            cases.forEach(testCase => {
                const [action, message, title] = testCase,
                    payload: ErrorPayload = {
                        module,
                        message,
                        title,
                        error: undefined,
                        info: undefined,
                    },
                    dispatch = jest.fn();
                const spy = jest.spyOn(errorsActions, 'setError');

                errorsActions[action as 'networkError' | 'requestError' | 'applicationError'](module)(dispatch);
                expect(spy).toHaveBeenCalledWith(payload);

                spy.mockRestore();
            });
        });
    });
});
describe('reduxErrorHandler', () => {
    it('dispatches applicationError action', () => {
        const error = new Error('test error'),
            getState = jest.fn(),
            lastAction: Action<null> = {
                type: 'LastAction',
                payload: null,
            },
            dispatch = jest.fn();
        const spy = jest.spyOn(errorsActions, 'applicationError');

        reduxErrorHandler(error, getState, lastAction, dispatch);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('application', error.toString());

        spy.mockRestore();
    });
});
