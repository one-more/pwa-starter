import * as React from 'react';
import styled from 'styled-components';

type Props = {
    className?: string;
};

const Wrapper = styled.span`
    display: inline-block;

    svg {
        width: 100%;
        height: 100%;
    }
`;

export const IOSShareIcon = ({ className }: Props) => (
    <Wrapper className={className}>
        <svg height="50" id="Layer_1" viewBox="0 0 50 50" width="50" xmlns="http://www.w3.org/2000/svg">
            <polyline
                fill="none"
                points="17,10 25,2 33,10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
            />
            <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
                x1="25"
                x2="25"
                y1="32"
                y2="2.333"
            />
            <rect fill="none" height="50" width="50" />
            <path
                d="M17,17H8v32h34V17h-9"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="2"
            />
        </svg>
    </Wrapper>
);
