import { mount } from 'enzyme';
import * as React from 'react';
import { AddToIPhone } from './index';

jest.mock('~/modules/device', () => ({
    isInStandaloneMode: () => false,
    isIPhone: true,
    isSafari: true,
}));

describe('AddToIPhone', () => {
    it('does not fail on render', () => {
        expect(mount(<AddToIPhone />).html()).not.toBe(null);
    });
    it('does not render if already shown', () => {
        const spy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => 'true');

        expect(mount(<AddToIPhone />).html()).toBe(null);

        spy.mockRestore();
    });
    it('updates localStorage & state in hide method', () => {
        const spy = jest.spyOn(Storage.prototype, 'setItem');

        const wrapper = mount<AddToIPhone>(<AddToIPhone />);
        wrapper.instance().hide();

        expect(wrapper.state()).toStrictEqual({
            open: false,
        });
        expect(spy).toHaveBeenCalledTimes(1);

        spy.mockRestore();
    });
    it('passes hide as prop', () => {
        const spy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => undefined);

        const wrapper = mount<AddToIPhone>(<AddToIPhone />);

        expect(wrapper.find({ onClickAway: wrapper.instance().hide })).toHaveLength(1);

        spy.mockRestore();
    });
});
