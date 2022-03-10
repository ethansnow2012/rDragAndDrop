import {dataMutate} from './dataMutate'
import {dragAndDropUtils} from './index'

export const dragAndDropWrapper = function () {}
/**
 * this
 * prototype:
 * - dragStart
 * - dragEnd
 * - dragOver
 * - drop
 * - dragEnter
 * - dragLeave
 **/
//dragAndDropWrapper.prototype.dragOver =  function(callback){

dragAndDropWrapper.prototype.dragStart =  function({}, callback){
    return function(ev){
        if(typeof callback=='function'){
            callback(ev)
        }  
    }
}

dragAndDropWrapper.prototype.dragEnd =  function({}, callback){
    return function(ev){
        if(typeof callback=='function'){
            callback(ev)
        }  
    }
}

dragAndDropWrapper.prototype.dragOver =  function({usedContext, ref}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        if(context.wrapperRef?.current!=ref.current){
            setContext({...context, wrapperRef: ref})
        }
        if(typeof callback=='function'){
            callback(ev)
        }  
        ev.preventDefault();
    }
}

dragAndDropWrapper.prototype.drop = function({usedContext, stateData, stateDragHover, props}, callback){
    return function(ev){
        const [data, setData] = stateData
        const [context, setContext] = usedContext
        const [isDragHover, setIsDragHover] = stateDragHover
        setTimeout(()=>{ // this wait for state to be updated
            console.log('drop')

            console.log('context', context)
            let latestDraggedParent = context.latestDraggedParent
            let latestDragged = context.latestDragged
            let latestDropParent = context.latestDropParent// the same with props.self
            let latestDrop = context.latestDrop
            
            // functions with side effects
            dataMutate.removeSelfFromParent(latestDragged, latestDraggedParent)
            dataMutate.addToAnotherParent(latestDragged, props.self, latestDrop)
            
            setData((_data)=>{//after mutation forcely invoke react update
                return {..._data}
            })
            setIsDragHover(false)
        }, 0)

        if(typeof callback=='function'){
            callback(ev)
        }  
    }
}

dragAndDropWrapper.prototype.dragEnter = function({usedContext, stateDragHover, ref}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        const [isDragHover, setIsDragHover] = stateDragHover
        setContext({...context, hoverDelegated: [isDragHover, setIsDragHover, ref]}) 
        setIsDragHover(true)
        if(typeof callback=='function'){
            callback(ev)
        }  
    }
}

dragAndDropWrapper.prototype.dragLeave = function({stateDragHover, ref}, callback){
    return function(ev){
        console.log('leave outter')
        const [isDragHover, setIsDragHover] = stateDragHover
        
        if(!dragAndDropUtils.isDescendantOrSelf(ref.current, ev.target)){
            setIsDragHover(false)                
        }

        if(document.latestWrapperState=='DRAG_IN_CHILD'){
            return
        }else if(document.latestWrapperState=='DRAG_INIT'){
            setIsDragHover(false)
        }
        document.latestDragEntered = null
        document.latestDragLeaved = null
        

        //ev.preventDefault()
        if(typeof callback=='function'){
            callback(ev)
        }  
    }
}

dragAndDropWrapper.prototype.wrapperRefEffectFn = function({usedContext, stateDragHover, ref}, callback){
    return function(){
        const [context, setContext] = usedContext
        const [isDragHover, setIsDragHover] = stateDragHover
        if(context.wrapperRef?.current!=ref.current&&context.targetRef?.current&&context.wrapperRef?.current){
            if(!dragAndDropUtils.isDescendantOrSelf(context.wrapperRef.current, context.targetRef.current)){
                setIsDragHover(false)                
            }
        }
        if(typeof callback=='function'){
            callback()
        }  
    }
}