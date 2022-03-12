
const _dataMutate = function () {}

_dataMutate.prototype.removeSelfFromParent = function(latestDragged, latestDraggedParent){
    let indexToParent = latestDraggedParent.data.indexOf(latestDragged)
    latestDraggedParent.data.splice(indexToParent, 1)//using splice sideEffect
}

_dataMutate.prototype.addToAnotherParent = function(latestDragged, targetParent, dropedElement){
    let indexToBeAppend = targetParent.data.indexOf(dropedElement)
    if(indexToBeAppend>=0){
        targetParent.data.splice(indexToBeAppend, 0, latestDragged)
        console.log(1)
    }else{
        // targetParent.data.splice(1, 0, latestDragged)
        // console.log(2)
        targetParent.data.push(latestDragged)
    }    
}

export const dataMutate = new _dataMutate()