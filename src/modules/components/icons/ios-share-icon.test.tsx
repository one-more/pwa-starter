import * as React from 'react';
import { IOSShareIcon } from './ios-share-icon';
import { mount } from 'enzyme';

describe('IOSShareIcon', () => {
    it('does not fail on render', () => {
        mount(<IOSShareIcon />);
    });
});
