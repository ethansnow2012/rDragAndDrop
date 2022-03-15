import {ref, useRef, useContext, useEffect} from 'react'
import styled from 'styled-components'

const Styled = styled.div`
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    padding: 1em 2em;
    min-width:90vw;
    min-height:100vh;

`

export function Post_RDragDrop_Root(props){
    return (
        <Styled >
            <div>Post_RDragDrop_Root</div>
            {props.children}
        </Styled>
    )
}