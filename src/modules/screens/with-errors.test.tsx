import * as React from 'react';
import { mount } from 'enzyme';
import { ErrorScreen } from './with-errors';

describe('Error screen', () => {
    it('renders without fail', () => {
        mount(<ErrorScreen tryToReRender={jest.fn()} />);
    });
});
