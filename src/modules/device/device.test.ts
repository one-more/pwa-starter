import { isAndroid, isInStandaloneMode, isIOS, isIPad, isIPhone, isLocalhost, isSafari } from '~/modules/device/index';

describe('device', () => {
    it('return false for all mobile checks', () => {
        expect(isSafari).toBe(false);
        expect(isIOS).toBe(false);
        expect(isIPhone).toBe(false);
        expect(isIPad).toBe(false);
        expect(isInStandaloneMode()).toBe(false);
        expect(isAndroid).toBe(false);
    });
    it('returns true for isLocalhost', () => {
        expect(isLocalhost).toBe(true);
    });
    it('returns correct boolean values for isInStandaloneMode', () => {
        delete window.navigator.standalone;
        expect(isInStandaloneMode()).toBe(false);

        window.navigator.standalone = false;
        expect(isInStandaloneMode()).toBe(false);

        window.navigator.standalone = true;
        expect(isInStandaloneMode()).toBe(true);
    });
});
