import {ref, useRef, useContext, useEffect, useLayoutEffect} from 'react'
import styled from 'styled-components'
import {dragAndDropContext, dragAndDrop} from 'rDragAndDrop/index'

const Styled = styled.div`
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    padding: 1em 2em;
    min-width:90vw;
    min-height:100vh;
    position: relative;

`

export function Post_RDragDrop_Root(props){
    const ref = useRef(null)
    const {contextInstance} = useContext(dragAndDropContext)
    const [context, setContext] = contextInstance
    const dragAndDropRootInitObject = {
        usedContext: [context, setContext],
        ref,
        options:{
            draggableWrapper:true
        }
    }
    const init = dragAndDrop.dragRoot.init(
            dragAndDropRootInitObject
        )
    useLayoutEffect(init,[ref])

    const dragOver = dragAndDrop.dragRoot.dragOver(
        dragAndDropRootInitObject,
        () => {
            console.log('dragOver')
        }
    )
    const drop = dragAndDrop.dragRoot.drop(
            dragAndDropRootInitObject
        )
    return (
        <Styled 
            ref={ref}
            onDragOver={dragOver}
            onDrop={drop}>
            <div>Post_RDragDrop_Root</div>
            {props.children}
        </Styled>
    )
}