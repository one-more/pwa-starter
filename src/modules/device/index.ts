export const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
export const isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
export const isIPhone = /iPhone/.test(navigator.userAgent);
export const isIPad = /iPad/.test(navigator.userAgent);
export const isInStandaloneMode = (): boolean => {
    if ('standalone' in window.navigator) {
        return window.navigator.standalone;
    }
};

declare global {
    interface Navigator {
        standalone?: boolean;
    }
}
