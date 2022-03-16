
import {ref, useRef, useContext, useLayoutEffect, useState} from 'react'
import styled from 'styled-components'
import {dragAndDropUtils, dragAndDropContext, isDescendant, dataMutate} from 'rDragAndDrop/index'

const Styled = styled.div`
    width:80px;
    height:80px;
    ---x_complement:0px;
    ---y_complement:0px;
    background:black;
    position: absolute;
    top:calc(var(---y) + var(---y_complement));
    left:calc(var(---x) + var(---x_complement));
    &.isDragging{

    }
`

export function Post_RDragDrop_Wrapper(props){
    const [isDragging, setIsDragging] = useState(false)
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
        stateDragging: [isDragging, setIsDragging],
        stateDragHover: [isDragHover, setIsDragHover],
        props,
        ref,
        options:{
            draggableWrapper:true
        }
    }
    

    const init = dragAndDropUtils.dragWrapper.init(dragAndDropWrapperInitObject) 
    useLayoutEffect(init,[ref])
    
    const dragStart = dragAndDropUtils.dragWrapper.dragStart(
        dragAndDropWrapperInitObject,
        (ev)=>{console.log('dragStart')}
    )
    const dragEnd = dragAndDropUtils.dragWrapper.dragEnd(
        dragAndDropWrapperInitObject,
        (ev)=>{console.log('dragStart')}
    )
    
    return (
        <Styled
        ref={ref}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        draggable='true' 
        className={(isDragging?' isDragging':'') + (isDragHover?' isDragHover':'')}>
            <div> </div>
        </Styled>
    )
}