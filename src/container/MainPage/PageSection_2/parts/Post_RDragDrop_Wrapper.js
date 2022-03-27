
import {ref, useRef, useContext, useLayoutEffect, useState} from 'react'
import styled from 'styled-components'
import {rDragRDrop, rDragRDropContext, isDescendant, dataMutate} from 'rDragRDrop/index'

const Styled = styled.div`
    width:200px;
    height:200px;
    ---x_complement:0px;
    ---y_complement:0px;
    background:black;
    position: absolute;
    display:grid;
    grid-auto-flow: column;
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
        } = useContext(rDragRDropContext)
    const [context, setContext] = contextInstance
    const rDragRDropWrapperInitObject = {
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
    

    const init = rDragRDrop.dragWrapper.init(rDragRDropWrapperInitObject) 
    useLayoutEffect(init,[ref])
    
    const dragStart = rDragRDrop.dragWrapper.dragStart(
        rDragRDropWrapperInitObject,
        (ev)=>{console.log('dragStart')}
    )
    const dragEnd = rDragRDrop.dragWrapper.dragEnd(
        rDragRDropWrapperInitObject,
        (ev)=>{console.log('dragStart')}
    )
    
    return (
        <Styled
        ref={ref}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        draggable='true' 
        className={(isDragging?' isDragging':'') + (isDragHover?' isDragHover':'')}>
            {props.children}
        </Styled>
    )
}