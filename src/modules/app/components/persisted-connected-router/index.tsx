import * as React from 'react';
import { Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter, ConnectedRouterProps, push } from 'connected-react-router';
import { isInStandaloneMode } from '~/modules/device';
import { Dispatch } from '~/modules/store/shared';
import { State } from '~/modules/store';

type Props = {
    dispatch: Dispatch<State>;
    children: ReactNode;
};

export type PersistedConnectedRouterProps = State & ConnectedRouterProps & Props;

export class PersistedConnectedRouterComponent extends Component<PersistedConnectedRouterProps> {
    componentDidMount(): void {
        const { dispatch, history } = this.props;
        const stateLocation = this.props.router.location || {
            pathname: '',
        };

        if (isInStandaloneMode()) {
            if (stateLocation.pathname !== history.location.pathname) {
                dispatch(push(stateLocation.pathname));
            }
        }
    }

    render() {
        return <ConnectedRouter {...this.props} />;
    }
}

export const PersistedConnectedRouter = connect((state: State) => state)(PersistedConnectedRouterComponent);
