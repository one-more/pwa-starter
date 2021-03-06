import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import * as storage from 'localforage';
import { connectRouter, RouterState } from 'connected-react-router';
import reduxCatch from 'redux-catch';
import { routerMiddleware } from 'connected-react-router';
import { errorsReducer, reduxErrorHandler, WithErrorsState } from '~/modules/errors';
import { Action } from 'redux';
import { PersistConfig } from 'redux-persist/es/types';
import { history } from '~/modules/history';

export type State = {
    router: RouterState;
} & WithErrorsState;

export const version = 1;

const persistConfig: PersistConfig<State> = {
    key: 'primary',
    version,
    storage,
    stateReconciler: autoMergeLevel1,
    blacklist: [],
};

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<State, Action, {}, {}>(
    persistReducer(
        persistConfig,
        enableBatching(
            combineReducers({
                router: connectRouter(history),
                errors: errorsReducer,
            }),
        ),
    ),
    composeEnhancers(applyMiddleware(reduxCatch(reduxErrorHandler), thunk, routerMiddleware(history))),
);
export const persistor = persistStore(store);
