import * as React from 'react';
import { mount } from 'enzyme';
import { ErrorScreen } from './with-errors';

jest.mock('~/modules/device', () => ({
    isAndroid: true,
    isIOS: true,
    isLocalhost: true,
}));

describe('Error screen', () => {
    it('renders without fail', () => {
        mount(<ErrorScreen tryToReRender={jest.fn()} />);
    });
    it('renders without fail with error passed', () => {
        mount(<ErrorScreen error={new Error('error 1')} tryToReRender={jest.fn()} />);
    });
});
