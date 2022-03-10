import styled from 'styled-components'
import {useState, useRef, useContext, useEffect, useLayoutEffect} from 'react'
import {dragAndDropUtils, dragAndDropContext, isDescendant} from 'rDragAndDrop/index'

const Styled = styled.div`
    &.hovered {
       background: red;
    }
    padding:0px;
    box-sizing: context-box;
`

export function RDragAndDropWrapper(props){
    const [isDragHover, setIsDragHover] = useState(false)
    const ref = useRef(null)
    const {
            data,
            setData,
            contextInstance
        } = useContext(dragAndDropContext)
    const [context, setContext] = contextInstance
    const dragAndDropWrapperInitObject = {
        usedContext: [context, setContext],
        stateData: [data, setData],
        stateDragHover: [isDragHover, setIsDragHover],
        props,
        ref
    }
    useEffect(
            dragAndDropUtils.dragWrapper.wrapperRefEffectFn(dragAndDropWrapperInitObject),
            [context.wrapperRef]
        )
    
    

    const dragStart = dragAndDropUtils.dragWrapper.dragStart(
        dragAndDropWrapperInitObject,
        (ev)=>{console.log('dragStart')}
    )
    const dragEnd = dragAndDropUtils.dragWrapper.dragEnd(
        dragAndDropWrapperInitObject
    )
    
    const dragOver = dragAndDropUtils.dragWrapper.dragOver(
        dragAndDropWrapperInitObject
    )
    const dragLeave = dragAndDropUtils.dragWrapper.dragLeave(
        dragAndDropWrapperInitObject
    )
    
    const drop = dragAndDropUtils.dragWrapper.drop(
        dragAndDropWrapperInitObject
    )
    const dragEnter = dragAndDropUtils.dragWrapper.dragEnter(
        dragAndDropWrapperInitObject
    )
    
    
    
    return (
        <Styled 
            ref={ref}
            onDragStart={dragStart}
            onDragOver={dragOver} 
            onDrop={drop} 
            onDragEnd={dragEnd}
            onDragLeave={dragLeave} 
            onDragEnter={dragEnter}
            className={isDragHover?'hovered':''}
        >
            {props.children}
        </Styled>
    )
}

export const DefaultStyle = Styled;