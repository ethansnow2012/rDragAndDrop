export const dragAndDropWrapper = function () {}

dragAndDropWrapper.prototype.dragOver =  function(callback){
    return function(ev){
        callback(ev)
        ev.preventDefault();
    }
}
dragAndDropWrapper.prototype.dragLeave =  function(callback){
    return function(ev){
        ev.preventDefault()
        callback(ev)
    }
}