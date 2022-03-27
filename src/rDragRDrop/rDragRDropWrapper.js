import {dataMutate} from './dataMutate'
import {rDragRDrop} from './index'
import {setCssPositionComplementViaRef, setCssPositionViaRef, calcMousePosition} from './coreHelpers'


export const rDragRDropWrapper = function () {}
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

rDragRDropWrapper.prototype.init = function({options, props, ref}){
    return function(){
        if(ref.current){
            if(options&&options.draggableWrapper==true){
                let {x, y} = props.self
                if((typeof x=='number') && (typeof y=='number')){
                    setCssPositionViaRef(ref, x, y)
                }
            }
        }else{
            console.log('Maybe invoked too early ref not ready.')
        }
    }
}

rDragRDropWrapper.prototype.dragStart =  function({usedContext, options, ref, stateDragging, props}, callback){
    return function(ev){
        if(options&&options.draggableWrapper==true){
            const [context, setContext] = usedContext
            const [isDragging, setIsDragging] = stateDragging
            console.log('dragging start-warpper')
            setIsDragging(true)
            // context double update in one life cycle cause "...context" to be stale
            //setContext({...context, draggingDelegated: [isDragging, setIsDragging, ref]}) 

            const {x:rootX, y:rootY} = calcMousePosition(ev, context.rootRef)
            const {x, y} = calcMousePosition(ev, ref)
            setCssPositionViaRef(ref, rootX, rootY)
            setCssPositionComplementViaRef(ref, -x, -y)
        }
        if(typeof callback=='function'){
            callback(ev, {options, ref, stateDragging})
        }  
    }
}

rDragRDropWrapper.prototype.dragEnd =  function({options, ref, stateDragging}, callback){
    return function(ev){
        if(options&&options.draggableWrapper==true){
            const [isDragging, setIsDragging] = stateDragging
            setIsDragging(false)
        }
        if(typeof callback=='function'){
            callback(ev, {options, ref, stateDragging})
        }  
    }
}

rDragRDropWrapper.prototype.dragOver =  function({usedContext, ref}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        if(context.wrapperRef?.current!=ref.current){
            setContext({...context, wrapperRef: ref})
        }
        if(typeof callback=='function'){
            callback(ev, {usedContext, ref})
        }  
        ev.preventDefault();
    }
}

rDragRDropWrapper.prototype.drop = function({usedContext, stateData, stateDragHover, ref, props}, callback){
    return function(ev){
        console.log('drop')
        
        const [data, setData] = stateData
        const [context, setContext] = usedContext
        const [isDragHover, setIsDragHover] = stateDragHover
        let latestDraggedParent = context.latestDraggedParent
        let latestDragged = context.latestDragged

        if(latestDraggedParent && latestDragged){
            if(ref.current==ev.target){
                dataMutate.removeSelfFromParent(latestDragged, latestDraggedParent)
                dataMutate.addToAnotherParent(latestDragged, props.self, null)
                context.latestDraggedParent = null
                context.latestDragged = null
                setData((_data)=>{//after mutation forcely invoke react update
                    return {..._data}
                })
            }
        }
        
        document.psuedoDataTransferText=null

        setIsDragHover(false)
        if(typeof callback=='function'){
            callback(ev, {usedContext, stateData, stateDragHover, ref, props})
        }  
    }
}

rDragRDropWrapper.prototype.dragEnter = function({usedContext, stateDragHover, ref}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        const [isDragHover, setIsDragHover] = stateDragHover
        setContext({...context, hoverDelegated: [isDragHover, setIsDragHover, ref]}) 
        setIsDragHover(true)
        if(typeof callback=='function'){
            callback(ev, {usedContext, stateDragHover, ref})
        }  
    }
}

rDragRDropWrapper.prototype.dragLeave = function({stateDragHover, ref}, callback){
    return function(ev){
        console.log('leave outter')
        const [isDragHover, setIsDragHover] = stateDragHover
        
        if(!rDragRDrop.isDescendantOrSelf(ref.current, ev.target)){
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
            callback(ev, {stateDragHover, ref})
        }  
    }
}

rDragRDropWrapper.prototype.wrapperRefEffectFn = function({usedContext, stateDragHover, ref}, callback){
    return function(){
        const [context, setContext] = usedContext
        const [isDragHover, setIsDragHover] = stateDragHover
        if(context.wrapperRef?.current!=ref.current&&context.targetRef?.current&&context.wrapperRef?.current){
            if(!rDragRDrop.isDescendantOrSelf(context.wrapperRef.current, context.targetRef.current)){
                setIsDragHover(false)                
            }
        }
        if(typeof callback=='function'){
            callback()
        }  
    }
}

rDragRDropWrapper.prototype.latestDropEffectFn = function({usedContext, stateData, stateDragHover, ref, props}, callback){
    return function(){
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

        if(latestDragged.id==latestDrop.id){
            return
        }
        
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
