
import styled from 'styled-components'

const Styled = styled.div`
    width:200px;
    height:200px;
    background: black;
    position: absolute;
    left: ${props => props.styleArgs.left};
    top: ${props => props.styleArgs.top};
    color: white;
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    & .inc{
        position: absolute;
        top: calc(100% + 1px);
        background: black;
        overflow: hidden;
        width: 96.5px;
        right: 0;
        transition: all 1s;
        padding: 0 0px 0.5px 2px;
    }
    & .inc-inner{
        left:-31.2px;
        position: relative;
        font-size: 0.5em;
        width: max-content;
        transition: all 1s;
        transition-delay: 0.5s;
    }
    & .inc:hover{
        width: max-content !important;
        width:200px !important;
    }
    & .inc:hover .inc-inner{
        left:0px;
    }
`

export function FooterCard(props) {
    return (
        <div style={{position:'relative'}}>
            <Styled styleArgs={props.styleArgs}>
                {props.children}
                <div className="inc">
                    <div className="inc-inner">
                        Mail: ethansnow2012@gmail.com
                    </div>
                </div>
            </Styled>
        </div>
    )
}