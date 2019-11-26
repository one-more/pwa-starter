import * as React from 'react';
import { ErrorScreen } from '~/modules/screens/with-errors';
import { mount } from 'enzyme';
import { ErrorBoundaryComponent, ErrorBoundaryProps } from '~/modules/errors';

jest.mock('../data/reducers', () => ({
    applicationError: jest.fn(),
}));
jest.mock('~/modules/screens/with-errors', () => ({
    ErrorScreen() {
        return <div>an error occurred</div>;
    },
}));

describe('ErrorBoundary', () => {
    const emptyProps: ErrorBoundaryProps = {
        applicationError: jest.fn(),
    };
    const renderError = new Error('internal error');
    function App() {
        return <div>1</div>;
    }

    beforeEach(() => {
        (emptyProps.applicationError as jest.Mock).mockReset();
    });

    it('renders children if no error occurred', () => {
        const wrapper = mount(
            <ErrorBoundaryComponent {...emptyProps}>
                <App />
            </ErrorBoundaryComponent>,
        );
        expect(wrapper.find(App)).toHaveLength(1);
        expect(emptyProps.applicationError).toHaveBeenCalledTimes(0);
    });
    it('dispatches action on catch and renders Error screen', () => {
        function App() {
            return <div>1</div>;
        }
        const wrapper = mount(
            <ErrorBoundaryComponent {...emptyProps}>
                <App />
            </ErrorBoundaryComponent>,
        );

        wrapper.instance().componentDidCatch(renderError, null);
        wrapper.instance().setState(ErrorBoundaryComponent.getDerivedStateFromError());
        wrapper.update();

        expect(wrapper.find(App)).toHaveLength(0);
        expect(wrapper.find(ErrorScreen)).toHaveLength(1);
        expect(emptyProps.applicationError).toHaveBeenCalledWith(
            'application',
            renderError.toString(),
            null,
            null,
            null,
        );

        wrapper.update();
    });
    it('passes tryToReRender prop', () => {
        const wrapper = mount(
            <ErrorBoundaryComponent {...emptyProps}>
                <App />
            </ErrorBoundaryComponent>,
        );

        wrapper.instance().componentDidCatch(renderError, null);
        wrapper.instance().setState(ErrorBoundaryComponent.getDerivedStateFromError());
        wrapper.update();

        expect(wrapper.find(App)).toHaveLength(0);

        wrapper
            .find(ErrorScreen)
            .props()
            .tryToReRender();
        wrapper.update();

        expect(wrapper.find(App)).toHaveLength(1);
    });
});
