import React, {useState, useEffect} from 'react';
import {getTodoData} from 'service/todos'
import {RDragAndDropTarget} from 'component/RDragAndDropTarget'
import {RDragAndDropRoot} from 'container/wrapper/RDragAndDropRoot'
import {RDragAndDropWrapper} from 'container/wrapper/RDragAndDropWrapper'
import {dragAndDropUtils, dragAndDropContext} from 'utils/rDragAndDropUtils'



export default {
    //title: 'List',
    component: RDragAndDropRoot,
    //subcomponents: {RDragAndDropWrapper, RDragAndDropTarget},
}

// export const Primary = () => <div mode="primary">Click me!</div>;

export const Default = ()=>{
    const [contentTestData, setContentTestData] = useState({data:[]})
    const dragAndDropContextInstance = dragAndDropUtils.initContext()()
    const contextObject = {
        content: contentTestData, 
        setContent: setContentTestData, 
        contextInstance: dragAndDropContextInstance
    }
    useEffect(async ()=>{
        setContentTestData(await getTodoData().then((data)=>{console.log('a', data); return data }))
    },[])
    return (
        <>
        <dragAndDropContext.Provider value={contextObject}>
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
                                                <RDragAndDropTarget key={todoItem.id} self={todoItem} parent={columnData}/>
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


