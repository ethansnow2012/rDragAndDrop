import {ref, useRef, useContext, useEffect} from 'react'
import styled from 'styled-components'
import {DefaultStyle} from 'container/wrapper/RDragAndDropWrapper'
import {dragAndDropContext, isDescendant} from 'utils/rDragAndDropUtils'

const Styled = styled.div`
    width: calc(100% - 10vh);
    height: calc(100vh - 20vh);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    display: flex;
    padding: 1em 2em;
    & > ${DefaultStyle}{
        margin-right: 2em;
    }
    &.isDragging{
    }
`

export function RDragAndDropRoot(props){
    const ref = useRef(null)
    const {dragAndDropContextInstance} = useContext(dragAndDropContext)
    const [context, setContext] = dragAndDropContextInstance
    
    const dragOver = (ev)=>{
        if(context.rootRef!=ref){
            setContext({...context, rootRef: ref})
        }
        ev.preventDefault()
    }

    const drop = ()=>{
        console.log('root drop')
        if(context.hoverDelegated){
            const [_hovered, _setHovered, _ref] = context.hoverDelegated
            _setHovered(false)
        }
    }
    return (
            <Styled 
                onDragOver={dragOver}
                onDrop={drop}
                className={context.isDragging?' isDragging':''}>
                {props.children}
            </Styled>
    )
}