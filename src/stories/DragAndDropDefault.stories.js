import React, {useState, useEffect} from 'react';
import {getAllTodoData} from 'service/data'
import {RDragAndDropTarget} from 'component/RDragAndDropTarget'
import {RDragAndDropRoot} from 'container/wrapper/RDragAndDropRoot'
import {RDragAndDropWrapper} from 'container/wrapper/RDragAndDropWrapper'
import {dragAndDrop, dragAndDropContext} from 'rDragAndDrop/index'



export default {
    //title: 'List',
    component: RDragAndDropRoot,
    //subcomponents: {RDragAndDropWrapper, RDragAndDropTarget},
}

// export const Primary = () => <div mode="primary">Click me!</div>;

export const Default = ()=>{
    const [contentTestData, setContentTestData] = useState({data:[]})
    const dragAndDropContextInstance = dragAndDrop.initContext()()
    const contextObject = {
        data: contentTestData, 
        setData: setContentTestData, 
        contextInstance: dragAndDropContextInstance
    }
    useEffect(async ()=>{
        setContentTestData(await getAllTodoData().then((data)=>{console.log('a', data); return data }))
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


