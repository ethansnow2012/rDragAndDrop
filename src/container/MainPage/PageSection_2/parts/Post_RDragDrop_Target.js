import styled from 'styled-components'
import {useRef, useState, useContext} from 'react'
import {rDragRDrop, rDragRDropContext, dataMutate} from 'rDragRDrop'

const Styled = styled.div`
    color: white;
    margin:5px;
    width: max-content;
    height: max-content;
    background: grey;
    & .icon{
        background: white;
        width:35px;
        height:35px;
    }
    & .title{
        display: flex;
        justify-content: center;
        font-size: 0.8em;
    }
`

export function Post_RDragDrop_Target(props){
    const ref = useRef(null)
    const {contextInstance} = useContext(rDragRDropContext)
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
            options:{
                draggableWrapper:true
            }
        }

    const dragStart = rDragRDrop.dragTarget.dragStart(
            dragTargetInitObject
        )
    const dragOver = rDragRDrop.dragTarget.dragOver(
            dragTargetInitObject
        )
    const dragEnd = rDragRDrop.dragTarget.dragEnd(
            dragTargetInitObject
        )
    const drop = rDragRDrop.dragTarget.drop(
            dragTargetInitObject
        )
    const dragEnter = rDragRDrop.dragTarget.dragEnter(
            dragTargetInitObject
        )
    const dragLeave = rDragRDrop.dragTarget.dragLeave(
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
            className={(isDragging?' isDragging':'') + (isDragHover?' isDragHover':'') + ( ' drag-cascading-stop')}
            >
            <div className='icon drag-cascading-stop'></div>
            <div className='title drag-cascading-stop'>fffff</div>
        </Styled>
    )
}