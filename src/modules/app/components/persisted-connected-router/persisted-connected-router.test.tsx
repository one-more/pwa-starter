import * as React from 'react';
import { mount } from 'enzyme';
import { PersistedConnectedRouterComponent, PersistedConnectedRouterProps } from './index';
import { ReactNode } from 'react';
import { ConnectedRouter, push, RouterState } from 'connected-react-router';
import { isInStandaloneMode } from '~/modules/device';

jest.mock('connected-react-router', () => ({
    ConnectedRouter: function ConnectedRouter({ children }: { children: ReactNode }) {
        return children;
    },
    push: jest.fn(),
}));
jest.mock('~/modules/device', () => ({
    isInStandaloneMode: jest.fn(),
}));

describe('PersistedConnectedRouter', () => {
    const getEmptyProps = (): PersistedConnectedRouterProps => {
        const location = {
            pathname: '/',
            search: '',
            state: '',
            hash: '',
        };
        return {
            dispatch: jest.fn(),
            history: {
                location: { ...location },
                length: 0,
                action: 'REPLACE',
                push(): void {
                    return;
                },
                replace(): void {
                    return;
                },
                go() {
                    return;
                },
                goBack() {
                    return;
                },
                goForward(): void {
                    return;
                },
                block() {
                    return () => {};
                },
                listen() {
                    return () => {};
                },
                createHref() {
                    return '';
                },
            },
            router: {
                location: { ...location },
                action: 'REPLACE',
            },
            errors: {
                application: null,
            },
            children: null,
        };
    };
    const enableStandaloneMode = () => {
        (isInStandaloneMode as jest.Mock).mockImplementation(() => true);
    };
    const disableStandaloneMode = () => {
        (isInStandaloneMode as jest.Mock).mockImplementation(() => false);
    };

    beforeEach(() => {
        (isInStandaloneMode as jest.Mock).mockReset();
        (push as jest.Mock).mockReset();
    });

    it('renders ConnectedRouter and children', () => {
        const emptyProps = getEmptyProps();
        function App() {
            return <div>1</div>;
        }
        const wrapper = mount(
            <PersistedConnectedRouterComponent {...emptyProps}>
                <App />
            </PersistedConnectedRouterComponent>,
        );
        expect(wrapper.find(ConnectedRouter)).toHaveLength(1);
        expect(wrapper.find(App)).toHaveLength(1);
    });
    it('does not push route if not in stand alone mode or already in location', () => {
        disableStandaloneMode();

        const emptyProps = getEmptyProps();
        mount(<PersistedConnectedRouterComponent {...emptyProps} />);

        expect(push).toHaveBeenCalledTimes(0);
        expect(emptyProps.dispatch).toHaveBeenCalledTimes(0);
        expect(isInStandaloneMode).toHaveBeenCalledTimes(1);

        enableStandaloneMode();
        mount(<PersistedConnectedRouterComponent {...emptyProps} />);

        expect(push).toHaveBeenCalledTimes(0);
        expect(emptyProps.dispatch).toHaveBeenCalledTimes(0);
        expect(isInStandaloneMode).toHaveBeenCalledTimes(2);
    });
    it('pushes route if in stand alone mode and location differs from saved one', () => {
        enableStandaloneMode();

        const emptyProps = getEmptyProps();
        emptyProps.router.location.pathname = '/1';

        mount(<PersistedConnectedRouterComponent {...emptyProps} />);

        expect(push).toHaveBeenCalledWith(emptyProps.router.location.pathname);
        expect(emptyProps.dispatch).toHaveBeenCalledTimes(1);
        expect(isInStandaloneMode).toHaveBeenCalledTimes(1);
    });
    it('does not fall if router has no location', () => {
        enableStandaloneMode();

        const emptyProps = getEmptyProps();
        const router: RouterState = {
            location: null,
            action: 'POP',
        };

        mount(<PersistedConnectedRouterComponent {...emptyProps} router={router} />);
    });
});
