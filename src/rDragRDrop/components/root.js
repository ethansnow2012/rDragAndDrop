import {ref, useRef, useContext, useEffect} from 'react'
import React from 'react'; 
import styled from 'styled-components'
import {DefaultStyle as wrapperDefaultStyle} from './wrapper'
import {rDragRDropContext, rDragRDrop} from '../index'


const Styled = styled.div`
    & > ${wrapperDefaultStyle}{
        
    }
    &.isDragging{
    }
`

export function RDragRDropRoot(props){
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

export const DefaultStyle = Styled;

export default {
    Element: RDragRDropRoot,
    DefaultStyle: Styled
}