import * as React from 'react';
import { connect } from 'react-redux';
import { ErrorInfo, PureComponent } from 'react';
import identity from 'ramda/src/identity';
import { ErrorsActions, errorsActions } from '../data/reducers';
import { ErrorScreen } from '~/modules/screens/with-errors';

type State = {
    hasError: boolean;
};

export type ErrorBoundaryProps = Pick<ErrorsActions, 'applicationError'>;

export class ErrorBoundaryComponent extends PureComponent<ErrorBoundaryProps, State> {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.props.applicationError('application', error.toString(), null, null, errorInfo);
    }

    tryToReRender = () => {
        this.setState({ hasError: false });
    };

    render() {
        return this.state.hasError ? <ErrorScreen tryToReRender={this.tryToReRender} /> : this.props.children;
    }
}

export const ErrorBoundary = connect(identity, errorsActions)(ErrorBoundaryComponent);
