
import styled from 'styled-components'

const Styled = styled.div`
    position:relative;
    height:0;
    z-index: 1000;
    & .topNavigation-block{
        position:absolute;
        right:0;
        top:0;
        background-color: black !important;
        height: 120px;
        width: 120px;
        transform: 
            rotate(37deg) 
            translate(-14px, -52px);
    }
    & .topNavigation-text{
        position:absolute;
        top:1em;
        right: 2em;
        color:white;
    }
    & .topNavigation-text-inner-line{
        position: relative;
        height: 1px;
        width: 100%;
        right: -10px;
        top: 2px;
        background: white;
    }
`
export function TopNavigation() {
    return (
        <Styled>
            <div className="topNavigation-block">
            
            </div>
            <div className="topNavigation-text">
                rDrag-rDrop.js
                <div className="topNavigation-text-inner">
                    <div className="topNavigation-text-inner-line"></div>
                </div>
            </div>
        </Styled>
    )
}