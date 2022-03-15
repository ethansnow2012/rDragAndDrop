import bg_1 from 'assets/bg-1.jpg';

import react, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled from 'styled-components'
import {getAllTodoData, getNewOneTodoData} from 'service/todos'
import {StaticBackgroundBlock, DefaultStyle as StaticBackgroundBlockStyle} from 'container/StaticBackgroundBlock'
import {RDragAndDropRoot} from 'container/wrapper/RDragAndDropRoot'
import {RDragAndDropWrapper, DefaultStyle as RDragAndDropWrapperStyle} from 'container/wrapper/RDragAndDropWrapper'
import {RDragAndDropTarget} from 'component/RDragAndDropTarget'
import {dragAndDropUtils, dragAndDropContext} from 'rDragAndDrop/index'

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
    

    const dragAndDropContextInstance = dragAndDropUtils.initContext()()
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
                        <RDragAndDropRoot >
                            {
                                todoData.data
                                    ?.map((columnData,ii) =>
                                    {
                                        return(    
                                            <RDragAndDropWrapper 
                                                ref={setRefsMap(columnData)}
                                                data-foo={ii} key={columnData.id} self={columnData} parent={todoData.data} >
                                                <div className='p-column-inner'>
                                                    {
                                                        columnData.data
                                                            .map((todoItem, jj)=>(
                                                                <RDragAndDropTarget key={todoItem.id} self={todoItem} parent={columnData}/>
                                                            ))
                                                    }
                                                </div>
                                                <div className='p-column-inc'>
                                                    <div className='p-column-inc-add' onClick={logRef(columnData.id)}>
                                                    </div>
                                                </div>
                                            </RDragAndDropWrapper>
                                        )
                                    }
                                )
                            }
                        </RDragAndDropRoot>
                    </div>
                </dragAndDropContext.Provider>
            </StaticBackgroundBlock>
        </Styled>
    )
}