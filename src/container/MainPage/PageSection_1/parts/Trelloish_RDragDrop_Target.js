import styled from 'styled-components'
import {useRef, useState, useContext, useEffect} from 'react'
import {rDragRDrop, rDragRDropContext, dataMutate} from 'rDragRDrop'

const Styled = styled.div`
    ---color: yellow;
    ---placeholder-height: unset;
    padding: 12px 5px;
    position:relative;
    &:hover{
        cursor: grab;
        cursor: -moz-grab;
        cursor: -webkit-grab;
    }
    &.isDragging{
        background: green;
        transition: height 1s;/* this seems to avoid some flickers.*/
    }
    &.isDragging:active{
        //cursor: grabbing !important;
        //cursor: url(https://www.google.com/intl/en_ALL/mapfiles/closedhand.cur);
    }
    &.isDragHover:not(.isDragging){
        z-index: 1;
        margin-top: calc(1 * var(---placeholder-height));
    }
    &.isDragHover:not(.isDragging)::after{
        position: absolute;
        content: '';
        bottom: 100%;
        background: grey;
        width: 100%;
        height: 100%;
        left: 0;
    }
    &:focus{
        background: white;
    }
    & .selfName{
        font-size: 0.5em;
        padding-left: 0;
        width: max-content;
    }
    & > * + *{
        margin-top:4px;
    }
    & > *{
        padding: 0px 5px;
    }
    & .editableDiv{
        padding-top: 3px;
        padding-bottom: 3px;
        background: #ffffffa1;
        font-size: 0.8em;
        border-radius: 3px;
        overflow: hidden;
    }
    & .editableDiv:focus{
        outline: none;
        background: white;
        cursor: initial;
    }
    & .selfName:focus{
        outline: none;
        cursor: initial;
    }
`



export function Trelloish_RDragDrop_Target(props){
    const ref = useRef(null)
    const {contextInstance} = useContext(rDragRDropContext)
    const [isDragHover, setIsDragHover] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [context, setContext] = contextInstance
    
    
    useEffect(()=>{
        if(props.self.isNew){ // This will only pass once. Then set to false by proxy
            ref.current.scrollIntoView({block: "nearest", inline: "nearest", behavior: "smooth"})   
        }
    }, [ref])
    const dragTargetInitObject = {
            usedContext: [context, setContext],
            stateDragging: [isDragging, setIsDragging],
            stateDragHover: [isDragHover, setIsDragHover],
            props,
            ref,
            latestDrop: props.self,
            latestDropParent: props.parent,
        }

    const dragStart = rDragRDrop.dragTarget.dragStart(
            dragTargetInitObject,
            (ev)=>{console.log('dragStart');}
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
    const editBlur = (ev)=>{
        props.self.job_title = ev.target.innerHTML
        setContext(()=>{
            return {...context}
        })
    }
    const editBlurTitle = (ev)=>{
        props.self.title = ev.target.innerHTML
        setContext(()=>{
            return {...context}
        })
    }
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
            <div className="selfName" dangerouslySetInnerHTML={{__html: props.self.title}} contentEditable="true" onBlur={editBlurTitle} suppressContentEditableWarning={true}></div>
            <div className="editableDiv" dangerouslySetInnerHTML={{__html: props.self.job_title}} contentEditable="true" onBlur={editBlur} suppressContentEditableWarning={true}></div>
        </Styled>
    )
}