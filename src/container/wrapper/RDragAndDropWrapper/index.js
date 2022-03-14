import styled from 'styled-components'
import {useState, useRef, useContext, useEffect, useLayoutEffect, useImperativeHandle, forwardRef} from 'react'
import {dragAndDropUtils, dragAndDropContext, isDescendant, dataMutate} from 'rDragAndDrop/index'

const Styled = styled.div`
    &.hovered {
       background: red;
    }
    padding:0px;
    box-sizing: context-box;
`

export const RDragAndDropWrapper = forwardRef(function (props, forwordSelfRef){
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
            dragAndDropUtils.dragWrapper.wrapperRefEffectFn(dragAndDropWrapperInitObject),
            [context.wrapperRef]
        )
    useEffect(
            dragAndDropUtils.dragWrapper.latestDropEffectFn(dragAndDropWrapperInitObject),
            [context.latestDrop]
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
})

export const DefaultStyle = Styled;