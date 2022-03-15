import {ref, useRef, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {DefaultStyle} from './Trelloish_RDragDrop_Wrapper'
import {dragAndDropContext, dragAndDropUtils} from 'rDragAndDrop/index'


const Styled = styled.div`
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
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
    const {contextInstance} = useContext(dragAndDropContext)
    const [context, setContext] = contextInstance
    const dragAndDropRootInitObject = {
        usedContext: [context, setContext],
        ref
    }
    const dragOver = dragAndDropUtils.dragRoot.dragOver(
            dragAndDropRootInitObject
        )
    const drop = dragAndDropUtils.dragRoot.drop(
            dragAndDropRootInitObject
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