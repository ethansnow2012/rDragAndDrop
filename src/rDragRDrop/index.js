import {useState, createContext} from 'react'
import {rDragRDropTarget} from './rDragRDropTarget'
import {rDragRDropWrapper} from './rDragRDropWrapper'
import {rDragRDropRoot} from './rDragRDropRoot'
import {dataMutate} from './dataMutate'

import root from './components/root'
import wrapper from './components/wrapper'
import target from './components/target'


 /**
  * _context
  * property:
  *  - data
  *  - setData
  *  - targetRef
  *  - wrapperRef
  *  - rootRef
  *  - options
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






core.prototype.dragTarget = new rDragRDropTarget()
core.prototype.dragWrapper = new rDragRDropWrapper()
core.prototype.dragRoot = new rDragRDropRoot()

//core.prototype.dataMutate = new _dataMutate()
const defaultComponents = {
    root,
    wrapper,
    target
}

export const rDragRDrop = new core();
export const rDragRDropContext = _context;
export {
    dataMutate,
    defaultComponents,
}
