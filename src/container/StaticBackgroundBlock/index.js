import {useEffect} from 'react';
import styled from 'styled-components'

const StyledBlock = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    background-attachment: fixed !important;
    background-image:${props=>props.image?`url(${props.image})`:''};
`

export function StaticBackgroundBlock(props) {
    useEffect(()=>{
        console.log('StaticBackgroundBlock')
    },[])
    //
    return (
        <StyledBlock image={props.image}>
            {props.children}
        </StyledBlock>
    )
}
export const DefaultStyle = StyledBlock ;

 