
const _dataMutate = function () {}

_dataMutate.prototype.removeSelfFromParent = function(latestDragged, latestDraggedParent){
    let indexToParent = latestDraggedParent.data.indexOf(latestDragged)
    latestDraggedParent.data.splice(indexToParent, 1)//using splice sideEffect
}

_dataMutate.prototype.addToAnotherParent = function(latestDragged, targetParent, dropedElement){
    let indexToBeAppend = targetParent.data.indexOf(dropedElement)
    if(indexToBeAppend){
        targetParent.data.splice(indexToBeAppend+1, 0, latestDragged)
    }else{
        targetParent.data.push(latestDragged)
    }    
}

export const dataMutate = new _dataMutate()