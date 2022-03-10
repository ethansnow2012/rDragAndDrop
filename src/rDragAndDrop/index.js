import {useState, createContext} from 'react'
import {dragAndDropTarget} from './dragAndDropTarget'
import {dragAndDropWrapper} from './dragAndDropWrapper'
 /**
  * property:
  *  - targetRef
  **/
const _context = createContext(null)

const core = function () {}

const _dataMutate = function () {}

core.prototype.initContext = function(){
    return function(){
        const [context, setContext] = useState({})
        return [context, setContext]
    }
}
core.prototype.isDescendantOrSelf = function (parent, child) {
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


core.prototype.dragTarget = new dragAndDropTarget()
core.prototype.dragWrapper = new dragAndDropWrapper()
core.prototype.dataMutate = new _dataMutate()

export const dragAndDropUtils = new core();
export const dragAndDropContext = _context;
