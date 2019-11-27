export const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
export const isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
export const isIPhone = /iPhone/.test(navigator.userAgent);
export const isIPad = /iPad/.test(navigator.userAgent);
export const isInStandaloneMode = (): boolean => {
    if ('standalone' in window.navigator) {
        return window.navigator.standalone;
    }
    return false;
};
export const isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;
export const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/) ||
        window.location.hostname.includes('10.0.0'),
);

declare global {
    interface Navigator {
        standalone?: boolean;
    }
}
