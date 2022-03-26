import {useRef, useContext} from 'react'
import styled from 'styled-components'
import {DefaultStyle} from './Trelloish_RDragDrop_Wrapper'
import {rDragRDropContext, rDragRDrop} from 'rDragRDrop/index'


const Styled = styled.div`
    background: rgba(255, 255, 255, 0.55);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    /*
        bug: scroll ... flickered.
        backdrop-filter: blur(5px);    
    */
    display: flex;
    padding: 1em 2em;
    & > ${DefaultStyle}{
        margin-right: 2em;
    }
    &.isDragging{
    }
`

export function Trelloish_RDragDrop_Root(props){
    const ref = useRef(null)
    const {contextInstance} = useContext(rDragRDropContext)
    const [context, setContext] = contextInstance
    const rDragRDropRootInitObject = {
        usedContext: [context, setContext],
        ref
    }
    const dragOver = rDragRDrop.dragRoot.dragOver(
            rDragRDropRootInitObject
        )
    const drop = rDragRDrop.dragRoot.drop(
            rDragRDropRootInitObject
        )
    return (
            <Styled 
                onDragOver={dragOver}
                onDrop={drop}
                className={context.isDragging?' isDragging':''}>
                {props.children}
            </Styled>
    )
}