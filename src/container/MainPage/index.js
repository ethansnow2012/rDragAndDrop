import bg_1 from 'assets/bg-1.jpg';
import bg_2 from 'assets/bg-2.jpg';
import bg_3 from 'assets/bg-3.jpg';

import react, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {getTodoData} from 'Service/todos'
import {StaticBackgroundBlock, DefaultStyle as StaticBackgroundBlockStyle} from 'container/StaticBackgroundBlock'
import {TodoWrapper} from 'container/wrapper/TodoWrapper'
import {TodoColumnWrapper} from 'container/wrapper/TodoColumnWrapper'
import {TodoItem} from 'component/TodoItem'
import {dragAndDropUtils, dragAndDropContext} from 'utils/dragAndDropUtils'
import {makeid} from 'utils/globalUtils'


const Styled = styled.div`
    & ${StaticBackgroundBlockStyle}{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export function MainPage() {
    const [todoData, setTodoData] = useState({data:[]})
    const dragAndDropContextInstance = dragAndDropUtils.initContext()()
    useEffect(async ()=>{
        setTodoData(await getTodoData().then((data)=>{console.log('a', data); return data }))
    },[])
    return (
        <Styled>
        <StaticBackgroundBlock image={bg_1}>
            <dragAndDropContext.Provider value={{todoData, setTodoData, dragAndDropContextInstance}}>   
                <TodoWrapper>
                    {
                        todoData.data
                            ?.map((columnData,ii) =>
                            {
                                return(    
                                    <TodoColumnWrapper data-foo='ii' key={columnData.id} self={columnData} parent={columnData} >
                                        {
                                            columnData.data
                                                .map((todoItem, jj)=>(
                                                    <TodoItem key={todoItem.id} self={todoItem} parent={columnData}/>
                                                ))
                                        }
                                    </TodoColumnWrapper>
                                )
                            }
                        )
                    }
                </TodoWrapper>
            </dragAndDropContext.Provider>
        </StaticBackgroundBlock>
        <StaticBackgroundBlock image={bg_2}/>
        <StaticBackgroundBlock image={bg_3}/>
        </Styled>
    )
}