
import {ref, useRef, useContext, useLayoutEffect, useState, useEffect} from 'react'
import styled from 'styled-components'
import {rDragRDrop, rDragRDropContext, isDescendant, dataMutate} from 'rDragRDrop/index'

const Styled = styled.div`
    width:200px;
    height:200px;
    ---x_complement:0px;
    ---y_complement:0px;
    background:black;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
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
    useEffect((x)=>{
        console.log('isDragging effect', x, isDragging)
    }, [isDragging])
    

    const init = rDragRDrop.dragWrapper.init(rDragRDropWrapperInitObject) 
    useLayoutEffect(init,[ref])
    
    const dragStart = rDragRDrop.dragWrapper.dragStart(
        rDragRDropWrapperInitObject,
        (ev)=>{console.log('dragStart')}
    )
    const dragEnd = rDragRDrop.dragWrapper.dragEnd(
        rDragRDropWrapperInitObject,
        (ev)=>{console.log('SdragEnd')}
    )
    
    const dragOver = rDragRDrop.dragWrapper.dragOver(
        rDragRDropWrapperInitObject,
        (ev)=>{console.log('SdragOver')}
    )
    const dragLeave = rDragRDrop.dragWrapper.dragLeave(
        rDragRDropWrapperInitObject,
        (ev)=>{console.log('SdragLeave')}
    )
    
    const drop = rDragRDrop.dragWrapper.drop(
        rDragRDropWrapperInitObject,
        (ev)=>{console.log('Sdrop')}
    )
    const dragEnter = rDragRDrop.dragWrapper.dragEnter(
        rDragRDropWrapperInitObject,
        (ev)=>{console.log('SdragEnter')}
    )
    // const dragLeave = rDragRDrop.dragWrapper.dragLeave(
    //     rDragRDropWrapperInitObject,()=>{
    //         console.log('dragLeave')
    //     }
    // )

    return (
        <Styled
        ref={ref}
        onDragStart={dragStart}
        onDrop={drop}
        onDragEnd={dragEnd}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDragEnter={dragEnter}
        
        //onDragLeave={dragLeave} 
        
        draggable='true' 
        className={(isDragging?' isDragging':'') + (isDragHover?' isDragHover':'')}>
            {props.children}
        </Styled>
    )
}