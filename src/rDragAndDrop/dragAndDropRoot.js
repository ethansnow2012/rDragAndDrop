export const dragAndDropRoot = function () {}

dragAndDropRoot.prototype.dragOver = function({usedContext, stateDragging, props, ref}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        if(context.rootRef!=ref){
            setContext({...context, rootRef: ref})
        }
        ev.preventDefault()
    }
}

dragAndDropRoot.prototype.drop = function({usedContext, stateDragging, props}, callback){
    return function(ev){
        const [context, setContext] = usedContext
        if(context.hoverDelegated){
            const [isDragHover, setIsDragHover, _ref] = context.hoverDelegated
            setIsDragHover(false)   
        }
        console.log('root drop next')
    }
}
