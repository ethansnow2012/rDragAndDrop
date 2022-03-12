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

dragAndDropWrapper.prototype.drop = function({usedContext, stateData, stateDragHover, ref, props}, callback){
    return function(ev){
        console.log('drop')
        
        const [data, setData] = stateData
        const [context, setContext] = usedContext
        const [isDragHover, setIsDragHover] = stateDragHover

        let latestDraggedParent = context.latestDraggedParent
        let latestDragged = context.latestDragged
        
        if(ref.current==ev.target){
            dataMutate.removeSelfFromParent(latestDragged, latestDraggedParent)
            dataMutate.addToAnotherParent(latestDragged, props.self, null)
            
            setData((_data)=>{//after mutation forcely invoke react update
                return {..._data}
            })
        }
        
        setIsDragHover(false)
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

dragAndDropWrapper.prototype.latestDropEffectFn = function({usedContext, stateData, stateDragHover, ref, props}, callback){
    return function(){
        
        console.log('latestDropEffectFn')
        const [data, setData] = stateData
        const [context, setContext] = usedContext
        if(!context.latestDrop){
            return
        }
        const [isDragHover, setIsDragHover] = stateDragHover
        const latestDraggedParent = context.latestDraggedParent
        const latestDragged = context.latestDragged
        const latestDropParent = context.latestDropParent// the same with props.self
        const latestDrop = context.latestDrop
        
        if(latestDropParent != props.self){
            return
        }
        
        // functions with side effects
        dataMutate.removeSelfFromParent(latestDragged, latestDraggedParent)
        dataMutate.addToAnotherParent(latestDragged, props.self, latestDrop)
        
        setData((_data)=>{//after mutation forcely invoke react update
            return {..._data}
        })
    }
}