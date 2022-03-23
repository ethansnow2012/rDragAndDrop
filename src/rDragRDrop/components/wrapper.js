import styled from 'styled-components'
import {useState, useRef, useContext, useEffect, useLayoutEffect, useImperativeHandle, forwardRef} from 'react'
import React from 'react'; 
import {rDragRDrop, rDragRDropContext, isDescendant, dataMutate} from '../index'

const Styled = styled.div`
    box-sizing: context-box;
    /* this avoid margin collapse at the cost of using some css property */
      border-top: 1px solid transparent;
      margin-top: -1px;
    /* -- */
`

export const RDragRDropWrapper = forwardRef(function (props, forwordSelfRef){
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
            rDragRDrop.dragWrapper.wrapperRefEffectFn(rDragRDropWrapperInitObject),
            [context.wrapperRef]
        )
    useEffect(
            rDragRDrop.dragWrapper.latestDropEffectFn(rDragRDropWrapperInitObject),
            [context.latestDrop]
        )
    
    

    const dragStart = rDragRDrop.dragWrapper.dragStart(
        rDragRDropWrapperInitObject,
        (ev)=>{console.log('dragStart')}
    )
    const dragEnd = rDragRDrop.dragWrapper.dragEnd(
        rDragRDropWrapperInitObject
    )
    
    const dragOver = rDragRDrop.dragWrapper.dragOver(
        rDragRDropWrapperInitObject
    )
    const dragLeave = rDragRDrop.dragWrapper.dragLeave(
        rDragRDropWrapperInitObject
    )
    
    const drop = rDragRDrop.dragWrapper.drop(
        rDragRDropWrapperInitObject
    )
    const dragEnter = rDragRDrop.dragWrapper.dragEnter(
        rDragRDropWrapperInitObject
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
            className={isDragHover?' isDragHover':''}
        >
            {props.children}
        </Styled>
    )
})

export const DefaultStyle = Styled;

export default {
    Element: RDragRDropWrapper,
    DefaultStyle: Styled
}