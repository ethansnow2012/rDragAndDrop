import styled from 'styled-components'
import {useRef, useState, useContext} from 'react'
import {dragAndDropUtils, dragAndDropContext} from 'utils/rDragAndDropUtils'

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

    const dragStart = dragAndDropUtils.dragStart(
            {usedContext: [context, setContext], stateDragging: [isDragging, setIsDragging], props},
            (ev)=>{console.log('dragStart');document.latestWrapperState = 'DRAG_INIT'}
        )
    const dragOver = (ev)=>{
        ev.preventDefault()
        if(context.targetRef!=ref){
            setContext({...context, targetRef: ref})
        }
        
    }
    const dragEnd = dragAndDropUtils.dragEnd((ev)=>{
                const _isDragging = false
                setIsDragging(_isDragging)
                setContext({...context, _isDragging})
                window.requestAnimationFrame(()=>{
                    ev.target.style.visibility = ""; 
                })
            }
        )
    const drop = ()=>{
        setContext({...context, latestDrop: props.self, latestDropParent: props.parent})
    }
    const dragEnter = (ev)=>{
        if(document.latestWrapperState=='DRAG_INIT'){
            document.latestWrapperState='DRAG_IN_CHILD'
            console.log('DRAG_IN_CHILD')
        }

        console.log('enter inner')
        document.latestDragEntered = ev.target
        document.latestDragLeaved = null
        setIsDragHover(true)
    }
    const dragLeave = (ev)=>{
        document.latestDragEntered = null
        document.latestDragLeaved = ev.target
        
        if(document.latestWrapperState=='DRAG_IN_CHILD'){
            document.latestWrapperState='DRAG_INIT'    
            console.log('DRAG_INIT')
        }
        // setTimeout(()=>{
            
        //         const [_hovered, _setHovered, _wrapper_ref] = context.hoverDelegated
        //         if(ref.current.parentElement!=_wrapper_ref.current){//
        //             _setHovered(false)
        //             console.log('gotcha')
        //         }
            
        // },300)

        setIsDragHover(false)
        ev.stopPropagation()
        console.log('leave Inner', document.latestDragEntered)
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
            // className={(isDragging?' isDragging':'') + (isDragHover?' isDragHover':'')}
        >
                todo-item: {props.self.title}
        </Styled>
    )
}