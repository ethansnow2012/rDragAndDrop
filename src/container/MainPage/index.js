import bg_1 from 'assets/bg-1.jpg';
import bg_2 from 'assets/bg-2.jpg';
import bg_3 from 'assets/bg-3.jpg';

import react, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled from 'styled-components'
import {getTodoData} from 'service/todos'
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
    }
    & ${StaticBackgroundBlockStyle} ${RDragAndDropWrapperStyle} .p-column-inc-add{
        width: 100%;
        height: 30px;
        background: grey;
    }
    
`

export function MainPage() {
    let tempRef = useRef(null)
    const [todoData, setTodoData] = useState({data:[]})
    const dragAndDropContextInstance = dragAndDropUtils.initContext()()
    const contextObject = {
        data: todoData, 
        setData: setTodoData, 
        contextInstance: dragAndDropContextInstance
    }
    
    const logRef = (tempRef)=>{
        return ()=>{
            tempRef.current.simpleConsole()
        }
    }
    useEffect(async ()=>{
        setTodoData(await getTodoData().then((data)=>{console.log('a', data); return data }))
    },[])
    return (
        <Styled>
        <StaticBackgroundBlock image={bg_1}>
            <dragAndDropContext.Provider value={contextObject}>   
                <RDragAndDropRoot >
                    {
                        todoData.data
                            ?.map((columnData,ii) =>
                            {
                                return(    
                                    <RDragAndDropWrapper 
                                        ref={tempRef}
                                        data-foo='ii' key={columnData.id} self={columnData} parent={columnData} >
                                        <div className='p-column-inner'>
                                            {
                                                columnData.data
                                                    .map((todoItem, jj)=>(
                                                        <RDragAndDropTarget key={todoItem.id} self={todoItem} parent={columnData}/>
                                                    ))
                                            }
                                        </div>
                                        <div className='p-column-inc'>
                                            <div className='p-column-inc-add' onClick={logRef(tempRef)}>
                                            </div>
                                        </div>
                                    </RDragAndDropWrapper>
                                )
                            }
                        )
                    }
                </RDragAndDropRoot>
            </dragAndDropContext.Provider>
        </StaticBackgroundBlock>
        <StaticBackgroundBlock image={bg_2}/>
        <StaticBackgroundBlock image={bg_3}/>
        </Styled>
    )
}