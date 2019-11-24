import * as React from 'react';

export type ErrorScreenProps = {
    tryToReRender: Function;
};

export function ErrorScreen(props: ErrorScreenProps) {
    return <div>an error has occurred</div>;
}
