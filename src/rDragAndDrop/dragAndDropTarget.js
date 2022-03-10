export const dragAndDropTarget = function () {}



/**
 * dragTargetInitObject
 * Example:
 * // const dragTargetInitObject = {
 * //     usedContext: [context, setContext],
 * //     stateDragging: [isDragging, setIsDragging],
 * //     stateDragHovering: [isDragHover, setIsDragHover],
 * //     props,
 * //     ref,
 * //     latestDrop: props.self,
 * //     latestDropParent: props.parent,
 * // }
 * 
 * 
 **/

/**
 * dragStart
 *
 * @param {object} _ {
 *                      usedContext<react context>,
 *                      stateDragging<[reactState, reactStateSetter]> 
 *                          // expose this so that component can know
 *                          // whether itself is being dragged.
 *                      props // the props of the due component
 *                    }
 * @param {function} callback The power, must be a natural number.
 * 
 * @return {function} function that will actually be invoked when drag starts
 */
dragAndDropTarget.prototype.dragStart = function({usedContext, stateDragging, props}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        
        const [isDragging, setIsDragging] = stateDragging
        
        const _isDragging = true
        setIsDragging(_isDragging)
        setContext({
            ...context,
            isDragging: _isDragging,
            latestDragged: props.self,
            latestDraggedParent: props.parent,
            latestDrop:null,
            latestDropParent:null
        })
        window.requestAnimationFrame(()=>{
            ev.target.style.visibility = "hidden"; 
        })
        document.latestWrapperState = 'DRAG_INIT'
        if(typeof callback=='function'){
            callback(ev)
        }   
    }
}

/**
 * dragOver
 * @param {object} _ usedContext<react context>,
 *                   ref<react ref>
 * 
 **/
dragAndDropTarget.prototype.dragOver = function({usedContext, ref}, callback){
    const [context, setContext] = usedContext
    return function(ev){
        ev.preventDefault()
        if(context.targetRef!=ref){
            setContext({...context, targetRef: ref})
        }
        if(typeof callback=='function'){
            callback(ev)
        }  
    }
}

dragAndDropTarget.prototype.dragEnd = function({usedContext, stateDragging}, callback){
    return function(ev){
        const _isDragging = false
        const [context, setContext] = usedContext
        const [isDragging, setIsDragging] = stateDragging
        
        setIsDragging(_isDragging)
        setContext({...context, _isDragging})
        window.requestAnimationFrame(()=>{
            ev.target.style.visibility = ""; 
        })
        if(typeof callback=='function'){
            callback(ev)
        }  
    }
}

dragAndDropTarget.prototype.drop = function({usedContext, latestDrop, latestDropParent}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        setContext({...context, latestDrop, latestDropParent})

        if(typeof callback=='function'){
            callback(ev)
        }  
    }
}

dragAndDropTarget.prototype.dragEnter = function({stateDragHovering}, callback){
    return function(){
        const [isDragHover, setIsDragHover] = stateDragHovering
        if(document.latestWrapperState=='DRAG_INIT'){
            document.latestWrapperState='DRAG_IN_CHILD'
            console.log('DRAG_IN_CHILD')
        }
        console.log('enter inner')
        ///document.latestDragEntered = ev.target
        ///document.latestDragLeaved = null
        setIsDragHover(true)
    }

}

dragAndDropTarget.prototype.dragLeave = function({stateDragHovering}, callback){
    return function(ev){
        const [isDragHover, setIsDragHover] = stateDragHovering
        if(document.latestWrapperState=='DRAG_IN_CHILD'){
            document.latestWrapperState='DRAG_INIT'    
            console.log('DRAG_INIT')
        }

        setIsDragHover(false)
        ev.stopPropagation()
        console.log('leave Inner', document.latestDragEntered)
    }
}