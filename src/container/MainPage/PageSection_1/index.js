import bg_1 from 'assets/bg-1.jpg';

import React, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled from 'styled-components'
import {getAllTodoData, getNewOneTodoData} from 'service/data'
import {StaticBackgroundBlock, DefaultStyle as StaticBackgroundBlockStyle} from 'container/StaticBackgroundBlock'

import {dragAndDrop, dragAndDropContext} from 'rDragAndDrop/index'
import {DefaultPopup} from 'components/popup/index.js'
import {HeaderForPopupH1, HeaderForPopupH2} from 'components/HeaderForPopup'


import {Trelloish_RDragDrop_Root} from './parts/Trelloish_RDragDrop_Root'
import {Trelloish_RDragDrop_Wrapper, DefaultStyle as RDragAndDropWrapperStyle} from './parts/Trelloish_RDragDrop_Wrapper'
import {Trelloish_RDragDrop_Target} from './parts/Trelloish_RDragDrop_Target'

import Highlight from 'react-highlight'

const portalTarget = '#popup-root'

const Styled = styled.div`
    & ${StaticBackgroundBlockStyle}{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    & ${StaticBackgroundBlockStyle} ${RDragAndDropWrapperStyle} {
        display: flex;
        justify-content: center;
        //align-items: center;
        flex-direction: column;
    }

    & ${StaticBackgroundBlockStyle} ${RDragAndDropWrapperStyle} .p-column-inner{
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    & ${StaticBackgroundBlockStyle} ${RDragAndDropWrapperStyle} .p-column-inc{
        width: 100%;
        margin-top:auto;
        min-width:110px
    }
    & ${StaticBackgroundBlockStyle} ${RDragAndDropWrapperStyle} .p-column-inc-add{
        width: 100%;
        height: 30px;
        background: grey;
        justify-content: center;
        align-items: center;
        display:flex;
    }
    & ${StaticBackgroundBlockStyle} ${RDragAndDropWrapperStyle} .p-column-inc-add::before{
        content:'+';
        color: white;
        position:relative;
        top:-2px;
        font-size: 23px;
        left:-1px;
    }
    .rDragAndDropRoot-wrapper{
        width: calc(100% - 10vh);
        height: calc(100vh - 20vh);
        display: flex;
        justify-content: center;
        max-width: 100%;
        // overflow: auto;
        position: relative;
    }
    .rDragAndDropRoot-wrapper-inc{
        position: absolute;
        top:100%;
        right:0;
        background:white;
        padding: 2px 7px 3px 7px;
        cursor: pointer;
    }
    
`
const portalStyled = styled.div`
    .p-codepopup > * + *{
        margin-top:1.5rem;
    }
`

export function PageSection_1() {
    let refsMap = useRef(new Map()).current;
    const [todoData, setTodoData] = useState({data:[]})
    
    const [popupState, setPopupState] = useState(false)
    const togglePopup = ()=>{
        setPopupState(!popupState)
    }
    // Closure:refsMap, todoData
    const setRefsMap = function(columnData){
        return (ref) => {
            //console.log('setRefsMap', columnData, ref)
            return ref === null ? refsMap.delete(columnData.id) : refsMap.set(columnData.id, ref)
        }
    }
    

    const dragAndDropContextInstance = dragAndDrop.initContext()()
    const contextObject = {
        data: todoData, 
        setData: setTodoData, 
        contextInstance: dragAndDropContextInstance
    }

    const logRef = (id)=>{
        return async ()=>{
            const dueRef = refsMap.get(id)
            console.log('logRef', dueRef)
            const newData = await getNewOneTodoData()
            dueRef.updateOneTodo(newData)
        }
    }
    useEffect(async ()=>{
        setTodoData(await getAllTodoData().then((data)=>{console.log('a', data); return data }))
    },[])

    return (
        <Styled>
            <StaticBackgroundBlock image={bg_1}>
                <dragAndDropContext.Provider value={contextObject}>   
                    <div className='rDragAndDropRoot-wrapper'>
                        <Trelloish_RDragDrop_Root >
                            {
                                todoData.data
                                    ?.map((columnData,ii) =>
                                    {
                                        return(    
                                            <Trelloish_RDragDrop_Wrapper 
                                                ref={setRefsMap(columnData)}
                                                key={columnData.id} self={columnData} parent={todoData} >
                                                <div className='p-column-inner'>
                                                    {
                                                        columnData.data
                                                            .map((todoItem, jj)=>(
                                                                <Trelloish_RDragDrop_Target key={todoItem.id} self={todoItem} parent={columnData}/>
                                                            ))
                                                    }
                                                </div>
                                                <div className='p-column-inc'>
                                                    <div className='p-column-inc-add' onClick={logRef(columnData.id)}>
                                                    </div>
                                                </div>
                                            </Trelloish_RDragDrop_Wrapper>
                                        )
                                    }
                                )
                            }
                        </Trelloish_RDragDrop_Root>
                        <div className='rDragAndDropRoot-wrapper-inc' onClick={togglePopup}>
                            Source Code
                        </div>
                        <DefaultPopup portalStyled={portalStyled} portalTarget={portalTarget} popupState={[popupState, setPopupState]} className='p-codepopup'>
                            <HeaderForPopupH1>
                                How to implement "trello-ish" UI.
                            </HeaderForPopupH1>
                            <HeaderForPopupH2>
                                Define <strong>Root</strong> Element
                            </HeaderForPopupH2>
                            <Highlight language="javascript html">
                        {`
import {useRef, useContext} from 'react'
import styled from 'styled-components'
import {DefaultStyle} from './Trelloish_RDragDrop_Wrapper'
import {dragAndDropContext, dragAndDrop} from 'rDragAndDrop/index'

const Styled = styled.div\`
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    display: flex;
    padding: 1em 2em;
    & > \${DefaultStyle}{
    margin-right: 2em;
    }
    &.isDragging{
    /* .. */
    }
\`

export function Trelloish_RDragDrop_Root(props){
    const ref = useRef(null)
    const {contextInstance} = useContext(dragAndDropContext)
    const [context, setContext] = contextInstance
    const dragAndDropRootInitObject = {
    usedContext: [context, setContext],
    ref
    }
    const dragOver = dragAndDrop.dragRoot.dragOver(
    dragAndDropRootInitObject
    )
    const drop = dragAndDrop.dragRoot.drop(
    dragAndDropRootInitObject
    )
    return (
    <Styled 
        onDragOver={dragOver}
        onDrop={drop}
        className={context.isDragging?' isDragging':''}>
        {props.children}
    </Styled>
    )
}
                        `}
                            </Highlight>
                            <HeaderForPopupH2>
                                Define <strong>Wrapper</strong> Element with rDrag-rDrop.js
                            </HeaderForPopupH2>
                            <Highlight language="javascript html">
                        {`
import styled from 'styled-components'
import {useState, useRef, useContext, useEffect, useImperativeHandle, forwardRef} from 'react'
import {dragAndDrop, dragAndDropContext, dataMutate} from 'rDragAndDrop/index'

const Styled = styled.div\`
  &.hovered {
     background: red;
  }
  padding:0px;
  box-sizing: context-box;
\`

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
                        `}
                            </Highlight>
                            <HeaderForPopupH2>
                                Define <strong>Target</strong> Element with rDrag-rDrop.js
                            </HeaderForPopupH2>
                            <Highlight language="javascript html">
                        {`
import styled from 'styled-components'
import {useRef, useState, useContext} from 'react'
import {dragAndDrop, dragAndDropContext} from 'rDragAndDrop/index'

const Styled = styled.div\`
  ---color: yellow;
  ---placeholder-height: unset;
  padding: 5px 10px;
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
  /* */
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
\`

export function Trelloish_RDragDrop_Target(props){
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

  const dragStart = dragAndDrop.dragTarget.dragStart(
    dragTargetInitObject,
    (ev)=>{console.log('dragStart');}
  )
  const dragOver = dragAndDrop.dragTarget.dragOver(
    dragTargetInitObject
  )
  
  const dragEnd = dragAndDrop.dragTarget.dragEnd(
    dragTargetInitObject
  )
  const drop = dragAndDrop.dragTarget.drop(
    dragTargetInitObject
  )
  const dragEnter = dragAndDrop.dragTarget.dragEnter(
    dragTargetInitObject
  )
  const dragLeave = dragAndDrop.dragTarget.dragLeave(
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
                        `}
                            </Highlight>
                            <HeaderForPopupH2>
                                Implement the Definition
                            </HeaderForPopupH2>
                            <Highlight language="javascript html">
                        {`
<Trelloish_RDragDrop_Root >
{
    xxxData.data
    ?.map((columnData,ii) =>
    {
        return(  
        <Trelloish_RDragDrop_Wrapper 
            ref={setRefsMap(columnData)}
            key={columnData.id} 
            self={columnData} 
            parent={todoData} >
              <div className='p-column-inner'>
              {
                  columnData.data
                  .map((item, jj)=>(
                      <Trelloish_RDragDrop_Target 
                        key={item.id} 
                        self={item} 
                        parent={columnData}
                      />
                  ))
              }
              </div>
              <div className='p-column-inc'>
                <div className='p-column-inc-add' onClick={logRef(columnData.id)}></div>
              </div>
        </Trelloish_RDragDrop_Wrapper>
        )
    }
    )
}
</Trelloish_RDragDrop_Root>
                        `}
                            </Highlight>
                        </DefaultPopup>
                    </div>
                </dragAndDropContext.Provider>
            </StaticBackgroundBlock>
        </Styled>
    )
}