
import bg_2 from 'assets/bg-2.jpg';
import bg_3 from 'assets/bg-3.jpg';

import react, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled from 'styled-components'

import {StaticBackgroundBlock, DefaultStyle as StaticBackgroundBlockStyle} from 'container/StaticBackgroundBlock'
import {dragAndDropUtils, dragAndDropContext} from 'rDragAndDrop/index'


import {PageSection_1} from './PageSection_1/index'
import {PageSection_2} from './PageSection_2/index'



const Styled = styled.div`
    .posts-rDragAndDropRoot-wrapper{
        display: flex;
        justify-content: center;
        max-width: 100%;
        overflow: auto;
    }
    
`

export function MainPage() {
    return (
        <Styled>
            <PageSection_1/>
            <PageSection_2/>
            <StaticBackgroundBlock image={bg_3}/>
        </Styled>
    )
}