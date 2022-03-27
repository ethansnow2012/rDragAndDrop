export const rDragRDropTarget = function () {}
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


/**
 * dragTargetInitObject
 * Example:
 * // const dragTargetInitObject = {
 * //     usedContext: [context, setContext],
 * //     stateData: [data, setData],
 * //     stateDragging: [isDragging, setIsDragging],
 * //     stateDragHover: [isDragHover, setIsDragHover],
 * //     props,
 * //     ref,
 * //     latestDrop: props.self,
 * //     latestDropParent: props.parent,
 * // }
 **/

/**
 * dragStart
 *
 * @param {object} _ {
 *                      usedContext<dragTargetInitObject>,
 *                      stateDragging<[reactState, reactStateSetter]> 
 *                          // expose this so that component can know
 *                          // whether itself is being dragged.
 *                      props // the props of the due component
 *                    }
 * @param {function} callback The power, must be a natural number.
 * 
 * @return {function} function that will actually be invoked when drag starts
 */
rDragRDropTarget.prototype.dragStart = function({usedContext, stateDragging, props, options}, callback){
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
            ev.target.display="none"
            //ev.target.style.visibility = "hidden"; 
        })
        document.latestWrapperState = 'DRAG_INIT'
        if(options&&options.draggableWrapper==true){
            document.psuedoDataTransferText = 'TARGET_DRAGGED'
        }
        if(typeof callback=='function'){
            callback(ev, {usedContext, stateDragging, props})
        }   
    }
}

/**
 * dragOver
 * @param {object} _ usedContext<react context>,
 *                   ref<react ref>
 * @return {function}
 **/
rDragRDropTarget.prototype.dragOver = function({usedContext, ref}, callback){
    const [context, setContext] = usedContext
    return function(ev){
        ev.preventDefault()
        const selfHeight = ref.current.offsetHeight
                
        ref.current.style.setProperty("---color", "grey");
        ref.current.style.setProperty("---placeholder-height", selfHeight+"px");
        
        if(context.targetRef!=ref){
            setContext({...context, targetRef: ref})
        }
        if(typeof callback=='function'){
            callback(ev, {usedContext, ref})
        }  
    }
}

/**
 * 
 * @return {function}
 **/
rDragRDropTarget.prototype.dragEnd = function({usedContext, stateDragging, options}, callback){
    return function(ev){
        const _isDragging = false
        const [context, setContext] = usedContext
        const [isDragging, setIsDragging] = stateDragging
        
        setIsDragging(_isDragging)
        setContext({...context, _isDragging})
        window.requestAnimationFrame(()=>{
            ev.target.display=""
        //     ev.target.style.visibility = ""; 
        })
        if(options&&options.draggableWrapper==true){
            document.psuedoDataTransferText = null
        }
        
        if(typeof callback=='function'){
            callback(ev, {usedContext, stateDragging})
        }  
    }
}

/**
 * 
 * @return {function}
 **/
rDragRDropTarget.prototype.drop = function({usedContext, latestDrop, latestDropParent, stateDragHover}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        const [isDragHover, setIsDragHover] = stateDragHover
        setContext({...context, latestDrop, latestDropParent})
        setIsDragHover(false)
        if(typeof callback=='function'){
            callback(ev, {usedContext, latestDrop, latestDropParent, stateDragHover})
        }  
    }
}

/**
 * 
 * @return {function}
 **/
rDragRDropTarget.prototype.dragEnter = function({stateDragHover}, callback){
    return function(){
        const [isDragHover, setIsDragHover] = stateDragHover
        if(document.latestWrapperState=='DRAG_INIT'){
            document.latestWrapperState='DRAG_IN_CHILD'
            console.log('DRAG_IN_CHILD')
        }
        console.log('enter inner')
        setIsDragHover(true)
    }

}

/**
 * 
 * @return {function}
 **/
rDragRDropTarget.prototype.dragLeave = function({stateDragHover}, callback){
    return function(ev){
        const [isDragHover, setIsDragHover] = stateDragHover
        if(document.latestWrapperState=='DRAG_IN_CHILD'){
            document.latestWrapperState='DRAG_INIT'    
            console.log('DRAG_INIT')
        }

        setIsDragHover(false)
        ev.stopPropagation()
        console.log('leave Inner', document.latestDragEntered)
    }
}