import {useEffect} from 'react';
import styled from 'styled-components'

const StyledBlock = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    background-attachment: fixed !important;
    background-size: cover;
    background-image:${props=>props.image?`url(${props.image})`:''};
`

export function StaticBackgroundBlock(props) {
    return (
        <StyledBlock className={props.className} image={props.image} style={props.style}>
            {props.children}
        </StyledBlock>
    )
}
export const DefaultStyle = StyledBlock ;

 