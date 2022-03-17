import styled from 'styled-components'
import {useState, useRef, useContext, useEffect, useLayoutEffect, useImperativeHandle, forwardRef} from 'react'
import {dragAndDrop, dragAndDropContext, isDescendant, dataMutate} from 'rDragAndDrop/index'

const Styled = styled.div`
    &.hovered {
       background: red;
    }
    padding:0px;
    box-sizing: context-box;
`

export const Trelloish_RDragDrop_Wrapper = forwardRef(function (props, forwordSelfRef){
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
    
    useImperativeHandle(forwordSelfRef, ()=>
        ({
            simpleConsole: ()=>{ console.log('simpleConsole', ref) },
            updateOneTodo: async (data)=>{
                console.log('here', data, props.self)
                
                dataMutate.addToAnotherParent(data, props.self)
                setData((_data)=>{//after mutation forcely invoke react update
                    return {..._data}
                })
                console.log(data, context, props)
            }
        })
    )
    
    
    useEffect(
            dragAndDrop.dragWrapper.wrapperRefEffectFn(dragAndDropWrapperInitObject),
            [context.wrapperRef]
        )
    useEffect(
            dragAndDrop.dragWrapper.latestDropEffectFn(dragAndDropWrapperInitObject),
            [context.latestDrop]
        )
    
    

    const dragStart = dragAndDrop.dragWrapper.dragStart(
        dragAndDropWrapperInitObject,
        (ev)=>{console.log('dragStart')}
    )
    const dragEnd = dragAndDrop.dragWrapper.dragEnd(
        dragAndDropWrapperInitObject
    )
    
    const dragOver = dragAndDrop.dragWrapper.dragOver(
        dragAndDropWrapperInitObject
    )
    const dragLeave = dragAndDrop.dragWrapper.dragLeave(
        dragAndDropWrapperInitObject
    )
    
    const drop = dragAndDrop.dragWrapper.drop(
        dragAndDropWrapperInitObject
    )
    const dragEnter = dragAndDrop.dragWrapper.dragEnter(
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
})

export const DefaultStyle = Styled;