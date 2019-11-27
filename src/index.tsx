import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './modules/app';
import './index.css';
import { initI18N } from '~/modules/i18n';
import { Workbox } from 'workbox-window';
import { UpdateNotification } from '~/modules/components/update-notification';

initI18N();

if ('serviceWorker' in navigator && navigator.serviceWorker) {
    const wb = new Workbox('/service-worker.js');

    wb.addEventListener('waiting', () => {
        const notificationRoot = document.getElementById('notification');
        if (notificationRoot) {
            ReactDOM.render(
                <UpdateNotification
                    onUpdate={() => {
                        wb.messageSW({ type: 'SKIP_WAITING' });
                    }}
                />,
                notificationRoot,
            );
        }
    });

    navigator.serviceWorker.addEventListener('controllerchange', function() {
        window.location.reload();
    });

    wb.register();
}

ReactDOM.render(<App />, document.getElementById('root'));
