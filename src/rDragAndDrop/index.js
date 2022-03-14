import {useState, createContext} from 'react'
import {dragAndDropTarget} from './dragAndDropTarget'
import {dragAndDropWrapper} from './dragAndDropWrapper'
import {dragAndDropRoot} from './dragAndDropRoot'
import {dataMutate} from './dataMutate'


 /**
  * _context
  * property:
  *  - data
  *  - setData
  *  - targetRef
  *  - wrapperRef
  *  - rootRef
  **/
const _context = createContext(null)

const core = function () {}

//const _dataMutate = function () {}

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






core.prototype.dragTarget = new dragAndDropTarget()
core.prototype.dragWrapper = new dragAndDropWrapper()
core.prototype.dragRoot = new dragAndDropRoot()

//core.prototype.dataMutate = new _dataMutate()

export const dragAndDropUtils = new core();
export const dragAndDropContext = _context;
export {dataMutate}
