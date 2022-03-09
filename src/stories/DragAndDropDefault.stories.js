import React, {useState, useEffect} from 'react';
import {MainPage} from 'container/MainPage'
import {getTodoData} from 'service/todos'
import {RDragAndDropRoot} from 'container/wrapper/RDragAndDropRoot'
import {RDragAndDropWrapper} from 'container/wrapper/RDragAndDropWrapper'
import {dragAndDropUtils, dragAndDropContext} from 'utils/rDragAndDropUtils'


export default {
    title: 'List',
    component: RDragAndDropRoot,
    subcomponents: {}
}
export const Default1 = ()=>{
    const [contentTestData, setContentTestData] = useState({data:[]})
    const dragAndDropContextInstance = dragAndDropUtils.initContext()()
    useEffect(async ()=>{
        setContentTestData(await getTodoData().then((data)=>{console.log('a', data); return data }))
    },[])
    return (
        <>
        <dragAndDropContext.Provider value={{dragAndDropContextInstance}}>
            <RDragAndDropRoot>
                {
                    contentTestData.data
                    ?.map((columnData,ii) =>
                        {
                            return(    
                                <RDragAndDropWrapper key={columnData.id} self={columnData} parent={columnData} >
                                    {
                                        columnData.data
                                            .map((todoItem, jj)=>(
                                                <div>aaa</div>
                                                // <RDragAndDropTarget key={todoItem.id} self={todoItem} parent={columnData}/>
                                            ))
                                    }
                                </RDragAndDropWrapper>
                            )
                        }
                    )
                }
            </RDragAndDropRoot>
        </dragAndDropContext.Provider>
        </>
    )
}