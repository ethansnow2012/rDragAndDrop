import {ref, useRef, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {DefaultStyle as wrapperDefaultStyle} from './wrapper'
import {dragAndDropContext, dragAndDrop} from 'rDragAndDrop/index'


const Styled = styled.div`
    & > ${wrapperDefaultStyle}{
        
    }
    &.isDragging{
    }
`

export function RDragRDropRoot(props){
    const ref = useRef(null)
    const {contextInstance} = useContext(dragAndDropContext)
    const [context, setContext] = contextInstance
    const dragAndDropRootInitObject = {
        usedContext: [context, setContext],
        ref
    }
    const dragOver = dragAndDrop.dragRoot.dragOver(
            dragAndDropRootInitObject
        )
    const drop = dragAndDrop.dragRoot.drop(
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

export const DefaultStyle = Styled;