import * as React from 'react';
import { PureComponent } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Typography from '@material-ui/core/Typography';
import { isInStandaloneMode, isIPhone, isSafari } from '~/modules/device';
import styled from 'styled-components';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { IOSShareIcon } from '~/modules/components/icons/ios-share-icon';

const Popper = styled.div`
    position: fixed;
    bottom: 20px;
    left: 10px;
    right: 10px;
    z-index: 3;
    box-sizing: border-box;
    background: var(--add-to-home-screen-popup);
    border-radius: 5px;
    padding: 5px;
    display: flex;
    justify-content: center;

    &:after {
        content: '';
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin: 0 auto;
        width: 0;
        height: 0;
        border-top: solid 15px var(--add-to-home-screen-popup);
        border-left: solid 15px transparent;
        border-right: solid 15px transparent;
    }
`;

const ShareIcon = styled(IOSShareIcon)`
    vertical-align: middle;
    width: 24px;
    height: 24px;
    margin: 0 5px;
    color: var(--add-to-home-screen-icon);
`;

const StyledAddBoxIcon = styled(AddBoxIcon)`
    margin: 0 8px;
    vertical-align: middle;
    color: var(--add-to-home-screen-icon);
`;

type State = {
    open: boolean;
};

type Props = {};

const key = 'add-to-home-screen-shown';

export class AddToIPhone extends PureComponent<Props, State> {
    state = {
        open: !Boolean(localStorage.getItem(key)),
    };

    hide = () => {
        localStorage.setItem(key, 'true');
        this.setState({ open: false });
    };

    render = () => {
        return isIPhone && isSafari && !isInStandaloneMode() && this.state.open ? (
            <ClickAwayListener onClickAway={this.hide}>
                <Popper>
                    <StyledAddBoxIcon />
                    <Typography>
                        Install this webapp on your IPhone: tap
                        <ShareIcon />
                        and then Add to home screen
                    </Typography>
                </Popper>
            </ClickAwayListener>
        ) : null;
    };
}
