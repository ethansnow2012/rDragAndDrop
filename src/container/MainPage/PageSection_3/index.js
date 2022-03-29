
import bg_3 from 'assets/bg-3.jpg';
import styled from 'styled-components'
import {StaticBackgroundBlock, DefaultStyle as StaticBackgroundBlockStyle} from 'container/StaticBackgroundBlock'
import {FooterMountain} from './parts/FooterMountain'
import {FooterCard} from './parts/FooterCard'
import {FooterCloud} from './parts/FooterCloud'


const Styled = styled.div`

`

export function PageSection_3() {
    return (
        <div style={{background: 'antiquewhite'}}>
        <StaticBackgroundBlock style={{height:'125vh'}}>
            <FooterMountain styleArgs={{
                left:'30vw',
                size:'400px'
            }}>
            </FooterMountain>
            <FooterMountain styleArgs={{
                left:'60vw',
                size:'200px'
            }}>
            </FooterMountain>
            
            <FooterCloud styleArgs={{
                    left:'27vw',
                    top:'30vh',
                    width: '20vmin',
                    height: '20vmin'
                }}>
            </FooterCloud>
            <FooterCloud styleArgs={{
                    left:'60vw',
                    top:'20vh',
                    width: '15vmin',
                    height: '15vmin'
                }}>
            </FooterCloud>
            <FooterCard styleArgs={{
                    left:'73vw',
                    top:'31vh'
                }}>
                    <div>This project is still in the experiment stage. </div>
                    <div>If you have any question, please feel free to contact me.</div>
                    <div>And you are more than welcome to join this project.</div>
            </FooterCard>
            <FooterCloud styleArgs={{
                    left:'80vw',
                    top:'50vh',
                    width: '10vmin',
                    height: '10vmin'
                }}>
            </FooterCloud>
        </StaticBackgroundBlock>
        </div>
    )
}