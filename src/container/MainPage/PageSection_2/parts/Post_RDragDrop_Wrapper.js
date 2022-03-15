
import {ref, useRef, useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {dragAndDropUtils, dragAndDropContext, isDescendant, dataMutate} from 'rDragAndDrop/index'

const Styled = styled.div`
    width:80px;
    height:80px;
    background:black;
    position: absolute;
    top:var(---y);
    left:var(---x);
`

export function Post_RDragDrop_Wrapper(props){
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
        ref,
        options:{
            draggable:true
        }
    }
    const dragStart = dragAndDropUtils.dragWrapper.dragStart(
        dragAndDropWrapperInitObject,
        (ev)=>{console.log('dragStart')}
    )
    return (
        <Styled
        ref={ref}
        onDragStart={dragStart}
        draggable='true' >
            <div> </div>
        </Styled>
    )
}