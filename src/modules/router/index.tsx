import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '~/modules/store';
import { Route } from 'react-router-dom';
import { Home } from '~/modules/screens/home';

type RouterProps = State;

export const routes = {
    index: '/',
};

export const Routes = connect((state: State) => state)((props: RouterProps) => {
    return <Route path={routes.index} component={Home} />;
});
