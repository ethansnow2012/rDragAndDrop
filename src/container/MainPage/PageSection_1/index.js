import bg_1 from 'assets/bg-1.jpg';

import react, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled from 'styled-components'
import {getAllTodoData, getNewOneTodoData} from 'service/data'
import {StaticBackgroundBlock, DefaultStyle as StaticBackgroundBlockStyle} from 'container/StaticBackgroundBlock'

import {dragAndDrop, dragAndDropContext} from 'rDragAndDrop/index'

import {Trelloish_RDragDrop_Root} from './parts/Trelloish_RDragDrop_Root'
import {Trelloish_RDragDrop_Wrapper, DefaultStyle as RDragAndDropWrapperStyle} from './parts/Trelloish_RDragDrop_Wrapper'
import {Trelloish_RDragDrop_Target} from './parts/Trelloish_RDragDrop_Target'

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
        overflow: auto;
    }
`

export function PageSection_1() {
    let refsMap = useRef(new Map()).current;
    const [todoData, setTodoData] = useState({data:[]})

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

    // Closure:refsMap
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
                                                data-foo={ii} key={columnData.id} self={columnData} parent={todoData} >
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
                    </div>
                </dragAndDropContext.Provider>
            </StaticBackgroundBlock>
        </Styled>
    )
}