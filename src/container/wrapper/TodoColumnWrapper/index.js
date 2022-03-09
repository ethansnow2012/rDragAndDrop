import styled from 'styled-components'
import {useState, useRef, useContext, useEffect, useLayoutEffect} from 'react'
import {dragAndDropUtils, dragAndDropContext, isDescendant} from 'utils/dragAndDropUtils'

const Styled = styled.div`
    &.hovered {
       background: red;
    }
    padding:0px;
    box-sizing: context-box;
`

export function TodoColumnWrapper(props){
    const [hovered, setHovered] = useState(false)
    const ref = useRef(null)
    const {
            todoData,
            setTodoData,
            dragAndDropContextInstance
        } = useContext(dragAndDropContext)
    const [dragContext, setDragContext] = dragAndDropContextInstance
    useEffect(()=>{
        //console.log('context changed')
        if(dragContext.wrapperRef?.current!=ref.current&&dragContext.targetRef?.current&&dragContext.wrapperRef?.current){
            if(!isDescendant(dragContext.wrapperRef.current, dragContext.targetRef.current)){
                setHovered(false)                
            }
        }
        console.log('got catch', dragContext.wrapperRef, hovered, ref.current, props)
    },[dragContext.wrapperRef])
    const dragStart = ()=>{
        console.log('dragStart',hovered)
    }
    const dragOver = dragAndDropUtils.dragOver((ev)=>{
        //console.log('dragOver',hovered)
        //ev.preventDefault()
        //setHovered(true)
        if(dragContext.wrapperRef?.current!=ref.current){
            setDragContext({...dragContext, wrapperRef: ref})
        }
        //console.log('wrapper dragOver')
    })
    // useLayoutEffect(()=>{
    //     console.log('context changed(effect)')
    // }, [dragContext])
    // useEffect(()=>{
    //     console.log('context changed')
    // },[dragContext])
    const drop = (ev)=>{
        setTimeout(()=>{ // this wait for state to be updated
            console.log('drop')

            console.log('dragContext', dragContext)
            let latestDraggedParent = dragContext.latestDraggedParent
            let latestDragged = dragContext.latestDragged
            let latestDropParent = dragContext.latestDropParent// the same with props.self
            let latestDrop = dragContext.latestDrop
            
            // functions with side effects
            dragAndDropUtils.dataMutate.removeSelfFromParent(latestDragged, latestDraggedParent)
            dragAndDropUtils.dataMutate.addToAnotherParent(latestDragged, props.self, latestDrop)
            
            setTodoData((_todoData)=>{//after mutation forcely invoke react update
                return {..._todoData}
            })
            setHovered(false)
            
            const targetDataId = ev.dataTransfer.getData("_dragAndDropUtils_self");
            
        }, 0)
        
    }
    const dragEnter = (ev)=>{
        console.log('enter outter')
        setDragContext({...dragContext, hoverDelegated: [hovered, setHovered, ref]}) 
        setHovered(true)
    }
    const dragLeave = dragAndDropUtils.dragLeave((ev)=>{
        console.log('leave outter',document.latestDragEntered, ev.target, ref.current)
        
        if(!isDescendant(ref.current, ev.target)){
            setHovered(false)                
        }

        if(document.latestWrapperState=='DRAG_IN_CHILD'){
            return
        }else if(document.latestWrapperState=='DRAG_INIT'){
            setHovered(false)
        }
        document.latestDragEntered = null
        document.latestDragLeaved = null
        
        //setHovered(false)
        // if(!(ref.current==document.latestDragEntered?.parentElement)
        //     //|| (ref.current==document.latestDragLeaved?.parentElement)
        // ){
        //     document.latestDragEntered = null//ev.target
        //     console.log('11', document.latestDragEntered, document.latestDragLeaved)
        // }else{
        //     console.log('22', document.latestDragEntered, document.latestDragLeaved)
        //     setHovered(false)
        // }
        
    })
    
    return (
        <Styled 
            ref={ref}
            onDragStart={dragStart}
            onDragOver={dragOver} 
            onDrop={drop} 
            onDragLeave={dragLeave} 
            onDragEnter={dragEnter}
            className={hovered?'hovered':''}
        >
            {props.children}
        </Styled>
    )
}

export const DefaultStyle = Styled;