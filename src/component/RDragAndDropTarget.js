import styled from 'styled-components'
import {useRef, useState, useContext} from 'react'
import {dragAndDropUtils, dragAndDropContext} from 'rDragAndDrop/index'

const Styled = styled.div`
    padding: 5px 10px;
    &:hover{
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }
    &.isDragging{
        background: green;
    }
    &.isDragging:active{
        cursor: grabbing !important;
        cursor: url(https://www.google.com/intl/en_ALL/mapfiles/closedhand.cur);
    }
    .isDragHover{}
`


export function RDragAndDropTarget(props){
    const ref = useRef(null)
    const {contextInstance} = useContext(dragAndDropContext)
    const [isDragHover, setIsDragHover] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [context, setContext] = contextInstance

    const dragTargetInitObject = {
            usedContext: [context, setContext],
            stateDragging: [isDragging, setIsDragging],
            stateDragHover: [isDragHover, setIsDragHover],
            props,
            ref,
            latestDrop: props.self,
            latestDropParent: props.parent,
        }

    const dragStart = dragAndDropUtils.dragTarget.dragStart(
            dragTargetInitObject,
            (ev)=>{console.log('dragStart');}
        )
    const dragOver = dragAndDropUtils.dragTarget.dragOver(
            dragTargetInitObject
        )
    
    const dragEnd = dragAndDropUtils.dragTarget.dragEnd(
            dragTargetInitObject
        )
    const drop = dragAndDropUtils.dragTarget.drop(
            dragTargetInitObject
        )
    const dragEnter = dragAndDropUtils.dragTarget.dragEnter(
            dragTargetInitObject
        )
    const dragLeave = dragAndDropUtils.dragTarget.dragLeave(
            dragTargetInitObject
        )
    
    return (
        <Styled 
            ref={ref}
            draggable='true' 
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            onDragOver={dragOver}
            onDrop={drop}
            onDragEnter={dragEnter} 
            onDragLeave={dragLeave} 
            className={(isDragging?' isDragging':'') + (isDragHover?' isDragHover':'')}
        >
                todo-item: {props.self.title}
        </Styled>
    )
}