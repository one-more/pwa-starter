import * as React from 'react';
import { isAndroid, isIOS, isLocalhost } from '~/modules/device';

export type ErrorScreenProps = {
    tryToReRender: Function;
    error?: Error;
};

export function ErrorScreen({ error }: ErrorScreenProps) {
    if (isLocalhost && error) {
        console.log(error);
    }
    if ((isIOS || isAndroid) && error) {
        return <div>Rendering error: {error.message}</div>;
    }
    return <div>An error has occurred</div>;
}
