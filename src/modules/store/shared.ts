import { Action } from 'redux';

export interface Dispatch<S> {
    (action: Action): void;
    (asyncAction: (dispatch: Dispatch<S>, getState: () => S) => Promise<unknown> | void): void;
}

export interface GetState<S> {
    (): S;
}
