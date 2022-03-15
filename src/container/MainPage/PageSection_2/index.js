import bg_2 from 'assets/bg-2.jpg';

import react, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled from 'styled-components'
import {dragAndDropUtils, dragAndDropContext} from 'rDragAndDrop/index'
import {getPosts} from 'service/data'
import {StaticBackgroundBlock, DefaultStyle as StaticBackgroundBlockStyle} from 'container/StaticBackgroundBlock'

import {Post_RDragDrop_Wrapper} from './parts/Post_RDragDrop_Wrapper'
import {Post_RDragDrop_Root} from './parts/Post_RDragDrop_Root'

const Styled = styled.div`
    
    .posts-rDragAndDropRoot-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`


export function PageSection_2() {
    const [postsData, setPostsData] = useState({data:[]})
    const dragAndDropContextInstance = dragAndDropUtils.initContext()()
    const contextObject = {
        data: postsData, 
        setData: setPostsData, 
        contextInstance: dragAndDropContextInstance
    }
    useEffect(async ()=>{
        setPostsData(await getPosts().then((data)=>{console.log('a', data); return data }))
    },[])
    return (
        <Styled>
            <StaticBackgroundBlock image={bg_2}>
                <div className="posts-rDragAndDropRoot-wrapper">
                    <dragAndDropContext.Provider value={contextObject}>   
                        <Post_RDragDrop_Root >
                            {
                                postsData.data
                                ?.map((wrapperData)=>{
                                    return (
                                        <Post_RDragDrop_Wrapper key={wrapperData.id}>
                                        </Post_RDragDrop_Wrapper>
                                    )
                                })
                            }
                        </Post_RDragDrop_Root>
                    </dragAndDropContext.Provider>
                </div>
            </StaticBackgroundBlock>
        </Styled>
    )
}