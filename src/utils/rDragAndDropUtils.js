import {useState, createContext} from 'react'

const _context = createContext(null)
const _dragAndDropUtils = function () {}
const _dataMutate = function () {}

_dragAndDropUtils.prototype.initContext = function(){
    return function(){
        const [context, setContext] = useState({})
        return [context, setContext]
    }
}

_dragAndDropUtils.prototype.dragStart = function({usedContext, stateDragging, props}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        const [isDragging, setIsDragging] = stateDragging
        const _isDragging = true
        setIsDragging(_isDragging)
        setContext({
            ...context,
            isDragging: _isDragging,
            latestDragged:props.self,
            latestDraggedParent: props.parent,
            latestDrop:null,
            latestDropParent:null
        })
        window.requestAnimationFrame(()=>{
            ev.target.style.visibility = "hidden"; 
        })
        if(typeof callback=='function'){
            callback(ev)
        }
    }
}
_dragAndDropUtils.prototype.dragEnd = function(callback){
    return function(ev){
        callback(ev)
    }
}
_dragAndDropUtils.prototype.dragOver = function(callback){
    return function(ev){
        callback(ev)
        ev.preventDefault();
    }
}
_dragAndDropUtils.prototype.dragLeave = function(callback){
    return function(ev){
        ev.preventDefault()
        callback(ev)
    }
}

_dragAndDropUtils.prototype.dataMutate = new _dataMutate()

_dataMutate.prototype.removeSelfFromParent = function(latestDragged, latestDraggedParent){
    let indexToParent = latestDraggedParent.data.indexOf(latestDragged)
    latestDraggedParent.data.splice(indexToParent, 1)//using splice sideEffect
}

_dataMutate.prototype.addToAnotherParent = function(latestDragged, targetParent, dropedElement){
    //targetParent.date.indexOf(latestDragged)
    let indexToBeAppend = targetParent.data.indexOf(dropedElement)
    if(indexToBeAppend){
        targetParent.data.splice(indexToBeAppend+1, 0, latestDragged)
    }else{
        targetParent.data.push(latestDragged)
    }    
}




export const dragAndDropUtils = new _dragAndDropUtils();
export const dragAndDropContext = _context;
export const isDescendant = function (parent, child) {
    if(parent==child){
        return true
    }
    let node = child.parentNode;
    while (node) {
        if (node === parent) {
            return true;
        }

        // Traverse up to the parent
        node = node.parentNode;
    }

    // Go up until the root but couldn't find the `parent`
    return false;
};