import bg_1 from 'assets/bg-1.jpg';

import React, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled from 'styled-components'
import {getAllTodoData, getNewOneTodoData} from 'service/data'
import {StaticBackgroundBlock, DefaultStyle as StaticBackgroundBlockStyle} from 'container/StaticBackgroundBlock'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

import {rDragRDrop, rDragRDropContext} from 'rDragRDrop/index'
import {DefaultPopup} from 'components/popup/index.js'
import {HeaderForPopupH1, HeaderForPopupH2} from 'components/Headers'


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
        justify-content: flex-start;
        //align-items: center;
        flex-direction: column;
        // overflow: scroll;
        min-width: min-content;
    }
    & ${StaticBackgroundBlockStyle} ${RDragAndDropWrapperStyle} {
        position: relative;
    }
    & ${StaticBackgroundBlockStyle} ${RDragAndDropWrapperStyle} .p-column-inner{
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: calc(100% - 30px);
        overflow-y: auto;
    }

    & ${StaticBackgroundBlockStyle} ${RDragAndDropWrapperStyle} .p-column-inc{
        width: 100%;
        margin-top:auto;
        min-width:110px;
        // position: sticky;
        postion: absolute;
        bottom: 0px;
    }
    & ${StaticBackgroundBlockStyle} ${RDragAndDropWrapperStyle} .p-column-inc-add{
        width: 100%;
        height: 30px;
        background: grey;
        justify-content: center;
        align-items: center;
        display:flex;
        cursor: pointer;
    }
    & ${StaticBackgroundBlockStyle} ${RDragAndDropWrapperStyle} .p-column-inc-add::before{
        content:'+';
        color: white;
        position:relative;
        top:-2px;
        font-size: 23px;
        left:-1px;
    }
    .rDragRDropRoot-wrapper{
        // width: calc(100% - 10vh);
        height: calc(100vh - 20vh);
        display: flex;
        justify-content: center;
        max-width: 100%;
        // overflow: auto;
        position: relative;
    }
    .rDragRDropRoot-wrapper-inc{
        position: absolute;
        top:100%;
        right:0;
        background:white;
        padding: 2px 7px 3px 7px;
        cursor: pointer;
    }
    @media(max-width: 768px){
        .rDragRDropRoot-wrapper{
            width: 100%;
        }
    }
`
const portalStyled = styled.div`
    // .p-codepopup > * + *{
    //     margin-top:1.5rem;
    // }
`

const transition = styled.div`
    
    .transition-enter{
        opacity: 0.3;
        transition: opacity 0.8s;
    }
    .transition-enter-active{
        opacity: 1;
    }
    .transition-exit{
        opacity: 1;
    }
    .transition-exit-active{
        opacity: 0.5;
    }
`

export function PageSection_1() {
    //console.log('PageSection_1')
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
    

    const rDragRDropContextInstance = rDragRDrop.initContext()()
    const contextObject = {
        data: todoData, 
        setData: setTodoData, 
        contextInstance: rDragRDropContextInstance
    }

    const clickAddOne = (id)=>{
        return async ()=>{
            const dueRef = refsMap.get(id)
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
                <rDragRDropContext.Provider value={contextObject}>   
                    <div className='rDragRDropRoot-wrapper'>
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
                                                    <TransitionGroup  component={transition}>
                                                        {
                                                            columnData.data
                                                                .map((todoItem, jj)=>(
                                                                    <CSSTransition key={todoItem.id} timeout={800} classNames="transition">
                                                                        <Trelloish_RDragDrop_Target self={todoItem} parent={columnData}/>
                                                                    </CSSTransition>
                                                                ))  
                                                        }
                                                    </TransitionGroup>
                                                </div>
                                                <div className='p-column-inc'>
                                                    <div className='p-column-inc-add' onClick={clickAddOne(columnData.id)}>
                                                    </div>
                                                </div>
                                            </Trelloish_RDragDrop_Wrapper>
                                        )
                                    }
                                )
                            }
                        <div className='rDragRDropRoot-wrapper-inc' onClick={togglePopup}>
                            See Example Code.
                        </div>    
                        </Trelloish_RDragDrop_Root>
                        
                        <DefaultPopup portalStyled={portalStyled} portalTarget={portalTarget} popupState={[popupState, setPopupState]} className='p-codepopup'>
                            <div className="c-blockseparator-1">
                                <div className="c-blockseparator-2"> 
                                    <HeaderForPopupH1>
                                        How to implement "trello-ish" UI.
                                    </HeaderForPopupH1>
                                </div>
                                <div className="c-blockseparator-2">
                                    <div>
                                        This library is aimed to help dealing with the states and callback complexity. It just expose its core functions so that developers can be used in "react functional component" with almost full customizability.
                                        Like most library there are still some pre-consumption. For drag-and-drop to work, a three-layer structure(in html) and one context provider are needed:<br/>
                                        <br/>
                                        &nbsp;&nbsp;&nbsp;- Target: the actual element that will be dragged.<br/>
                                        &nbsp;&nbsp;&nbsp;- Wrapper: the elementthat will be the drop on.<br/>
                                        &nbsp;&nbsp;&nbsp;- Root: the zoom drag and drop happens.<br/>
                                    </div>
                                </div>
                            </div>
                            <div className="c-blockseparator-1"> 
                                <div className="c-blockseparator-2">
                                    <HeaderForPopupH2>
                                        Define <strong>Target</strong> Element with rDrag-rDrop.js
                                    </HeaderForPopupH2>
                                </div>
                                <div className="c-blockseparator-2">
                                    <Highlight language="javascript html">
                                {`
import styled from 'styled-components'
import {useRef, useState, useContext} from 'react'
import {rDragRDrop, rDragRDropContext} from 'rDragRDrop/index'

//style should not matter too much here
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
transition: height 1s;
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
                                </div>
                                
                            </div>
                            <div className="c-blockseparator-1"> 
                                <div className="c-blockseparator-2"> 
                                    <HeaderForPopupH2>
                                        Define <strong>Wrapper</strong> Element with rDrag-rDrop.js
                                    </HeaderForPopupH2>
                                </div>
                                <div className="c-blockseparator-2"> 
                                
                                    <Highlight language="javascript html">
                                {`
import styled from 'styled-components'
import {useState, useRef, useContext, useEffect, useImperativeHandle, forwardRef} from 'react'
import {rDragRDrop, rDragRDropContext, dataMutate} from 'rDragRDrop/index'

//style should not matter too much here
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
    className={isDragHover?'hovered':''}
    >
    {props.children}
    </Styled>
)
})

export const DefaultStyle = Styled;
                                `}
                                    </Highlight>
                                </div>
                            </div>
                            <div className="c-blockseparator-1"> 
                                <div className="c-blockseparator-2"> 
                                    <HeaderForPopupH2>
                                        Define <strong>Root</strong> Element
                                    </HeaderForPopupH2>
                                </div>
                                <div className="c-blockseparator-2"> 
                                    <Highlight language="javascript html">
                                {`
import {useRef, useContext} from 'react'
import styled from 'styled-components'
import {DefaultStyle} from './Trelloish_RDragDrop_Wrapper'
import {rDragRDropContext, rDragRDrop} from 'rDragRDrop/index'

//style should not matter too much here
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
    const {contextInstance} = useContext(rDragRDropContext)
    const [context, setContext] = contextInstance
    const rDragRDropRootInitObject = {
    usedContext: [context, setContext],
    ref
    }
    const dragOver = rDragRDrop.dragRoot.dragOver(
    rDragRDropRootInitObject
    )
    const drop = rDragRDrop.dragRoot.drop(
    rDragRDropRootInitObject
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
                                </div>
                            </div>
                            <div className="c-blockseparator-1"> 
                                <div className="c-blockseparator-2"> 
                                    <HeaderForPopupH2>
                                        Implement the Definition
                                    </HeaderForPopupH2>
                                </div>
                                <div className="c-blockseparator-2"> 
                                    <div>Initial some state and object.</div>
                                    <Highlight language="javascript html">
                                        {`
let refsMap = useRef(new Map()).current;
const [todoData, setTodoData] = useState({data:[]})

const [popupState, setPopupState] = useState(false)
const togglePopup = ()=>{
    setPopupState(!popupState)
}
const setRefsMap = function(columnData){
    return (ref) => {
        //console.log('setRefsMap', columnData, ref)
        return ref === null ? refsMap.delete(columnData.id) : refsMap.set(columnData.id, ref)
    }
}
const rDragRDropContextInstance = rDragRDrop.initContext()()
const contextObject = {
    data: todoData, 
    setData: setTodoData, 
    contextInstance: rDragRDropContextInstance
}
const clickAddOne = (id)=>{
    return async ()=>{
        const dueRef = refsMap.get(id)
        console.log('clickAddOne', dueRef)
        const newData = await getNewOneTodoData()
        dueRef.updateOneTodo(newData)
    }
}
useEffect(async ()=>{
    setTodoData(await getAllTodoData().then((data)=>{console.log('a', data); return data }))
},[])
                                        `}
                                    </Highlight>
                                </div>
                                <div className="c-blockseparator-2"> 
                                    <div>The Jsx.</div>
                                    <Highlight language="javascript html">
                                {`
return(
  <rDragRDropContext.Provider value={contextObject}>                
    <Trelloish_RDragDrop_Root >
    {
        todoData.data
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
            <div className='p-column-inc-add' onClick={clickAddOne(columnData.id)}></div>
            </div>
        </Trelloish_RDragDrop_Wrapper>
        )
        }
        )
    }
    </Trelloish_RDragDrop_Root>
  </rDragRDropContext.Provider>
)
                                `}
                                    </Highlight>
                                </div>
                            </div>
                        </DefaultPopup>
                    </div>
                </rDragRDropContext.Provider>
            </StaticBackgroundBlock>
        </Styled>
    )
}