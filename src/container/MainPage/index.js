
import bg_2 from 'assets/bg-2.jpg';
import bg_3 from 'assets/bg-3.jpg';

import react, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled from 'styled-components'
import {getAllTodoData, getNewOneTodoData} from 'service/todos'
import {StaticBackgroundBlock, DefaultStyle as StaticBackgroundBlockStyle} from 'container/StaticBackgroundBlock'
import {RDragAndDropRoot} from 'container/wrapper/RDragAndDropRoot'
import {RDragAndDropWrapper, DefaultStyle as RDragAndDropWrapperStyle} from 'container/wrapper/RDragAndDropWrapper'
import {RDragAndDropTarget} from 'component/RDragAndDropTarget'
import {dragAndDropUtils, dragAndDropContext} from 'rDragAndDrop/index'

import {PageSection_1} from './PageSection_1/index'



const Styled = styled.div`
    
`

export function MainPage() {
    return (
        <Styled>
            <PageSection_1/>
            <StaticBackgroundBlock image={bg_2}/>
            <StaticBackgroundBlock image={bg_3}/>
        </Styled>
    )
}