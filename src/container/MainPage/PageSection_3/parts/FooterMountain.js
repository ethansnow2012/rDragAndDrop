

import styled from 'styled-components'

const Styled = styled.div`
    width: 0;
    height: 0;
    display: grid;
    place-content: center;
    position: absolute;
    bottom: 0;
    ---size: 351px;
    left: 20vw;
    left: ${props => props.styleArgs.left};
    ---size: ${props => props.styleArgs.size};

    & .inner{
        width: var(---size);
        height: var(---size);
        background: orange;
        position: relative;
        -webkit-transform: rotateX(0deg) rotateY(59deg) rotateZ(45deg) translate3d(0px,0px,0px);
        -ms-transform: rotateX(0deg) rotateY(59deg) rotateZ(45deg) translate3d(0px,0px,0px);
        transform: rotateX(0deg) rotateY(59deg) rotateZ(45deg) translate3d(0px,0px,0px);
        clip-path: polygon(100% 0, 0 0, 0 100%);
    }

    & .inner::before{
        content: '';
        /* background: azure; */
        width: 50%;
        height: 50%;
        display: block;
        /* margin-left: 10px; */
        width: 0px;
        height: 0px;
        border-top: var(---size) solid transparent;
        border-bottom: var(---size) solid transparent;
        border-left: calc(var(---size) * 0.3) solid green;

    }
`

export function FooterMountain(props){
    console.log('FooterMountain', props)
    return (
        <Styled styleArgs={props.styleArgs}>
            <div className='inner'>
            </div>
        </Styled>
    )
}