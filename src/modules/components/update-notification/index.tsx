import * as React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import F from 'ramda/es/F';
import { SyntheticEvent } from 'react';
import { Trans } from '~/modules/i18n';

type State = {
    open: boolean;
};
type Props = {
    onUpdate: Function;
};

export class UpdateNotification extends React.Component<Props, State> {
    static defaultProps = {
        onUpdate: F,
    };

    state = {
        open: true,
    };

    handleClose = (event: SyntheticEvent, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            open: false,
        });
    };

    onUpdate = () => {
        this.props.onUpdate();
    };

    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={
                    <span id="message-id">
                        <Trans i18nKey="serviceWorker.updateAvailable" defaults="New version is available" />
                    </span>
                }
                action={[
                    <Button key="update" color="secondary" size="small" onClick={this.onUpdate}>
                        <Trans i18nKey="serviceWorker.update" defaults="Update" />
                    </Button>,
                ]}
            />
        );
    }
}
