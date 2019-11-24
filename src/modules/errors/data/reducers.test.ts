import {
    ErrorInfo,
    ErrorPayload,
    errorsActions,
    errorsDefaultState,
    errorsReducer,
    ErrorsState,
    reduxErrorHandler,
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
    describe('actions', () => {});
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
