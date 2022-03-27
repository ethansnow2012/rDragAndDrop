import bg_2 from 'assets/bg-2.jpg';

import React, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled from 'styled-components'
import {rDragRDrop, rDragRDropContext} from 'rDragRDrop/index'
import {getPosts} from 'service/data'
import {StaticBackgroundBlock, DefaultStyle as StaticBackgroundBlockStyle} from 'container/StaticBackgroundBlock'

import {Post_RDragDrop_Target} from './parts/Post_RDragDrop_Target'
import {Post_RDragDrop_Wrapper} from './parts/Post_RDragDrop_Wrapper'
import {Post_RDragDrop_Root} from './parts/Post_RDragDrop_Root'

const Styled = styled.div`
    
    .posts-rDragRDropRoot-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`


export function PageSection_2() {
    const [postsData, setPostsData] = useState({data:[]})
    const rDragRDropContextInstance = rDragRDrop.initContext()()
    const contextObject = {
        data: postsData, 
        setData: setPostsData, 
        contextInstance: rDragRDropContextInstance
    }
    useEffect(async ()=>{
        setPostsData(await getPosts().then((data)=>{
            console.log('a', data); 
            return data 
        }))
    },[])
    return (
        <Styled>
            <StaticBackgroundBlock image={bg_2}>
                <div className="posts-rDragRDropRoot-wrapper">
                    <rDragRDropContext.Provider value={contextObject}>   
                        <Post_RDragDrop_Root >
                            {
                                postsData.data
                                ?.map((wrapperData)=>{
                                    return (
                                        <Post_RDragDrop_Wrapper key={wrapperData.id} self={wrapperData} parent={postsData}>
                                            {
                                                wrapperData.data.map((targetData)=>{
                                                    return (
                                                        <Post_RDragDrop_Target key={targetData.id} self={targetData} parent={wrapperData}>
                                                        </Post_RDragDrop_Target>
                                                    )
                                                })
                                            }
                                        </Post_RDragDrop_Wrapper>
                                    )
                                })
                            }
                        </Post_RDragDrop_Root>
                    </rDragRDropContext.Provider>
                </div>
            </StaticBackgroundBlock>
        </Styled>
    )
}