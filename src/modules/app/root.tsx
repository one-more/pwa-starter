import * as React from 'react';
import { memo } from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from '~/modules/store';
import { PersistGate } from 'redux-persist/integration/react';
import { PersistedConnectedRouter } from './persisted-connected-router';
import { ErrorBoundary } from '~/modules/errors';
import { LoadingSplash } from '~/modules/screens/loading-splash';
import { Routes } from '~/modules/router';
import { history } from '~/modules/history';
import { AddToIPhone } from '~/modules/components/add-to-home-screen';

export const Root = memo(function Root() {
    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingSplash />} persistor={persistor}>
                <PersistedConnectedRouter history={history}>
                    <ErrorBoundary>
                        <Routes />
                        <AddToIPhone />
                    </ErrorBoundary>
                </PersistedConnectedRouter>
            </PersistGate>
        </Provider>
    );
});
