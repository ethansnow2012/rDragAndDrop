
import style from 'styled-components'

const makeId = function (length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

const Style = style.div`
    background: #5a80da;
    width:150px;
    height:150px;
    position: absolute;
    opacity: 0.8;
    left: calc(${props => props.styleArgs.left} + ${props => props.styleArgs.inc?'0px':'-100vw'});
    top: ${props => props.styleArgs.top};
    width: ${props => props.styleArgs.width};
    height: ${props => props.styleArgs.height};
    animation: floating-${props => props.innerId}${props => props.styleArgs.inc?'-inc':''} 30s linear infinite;

    @keyframes floating-${props => props.innerId}${props => props.styleArgs.inc?'-inc':''} {
        from {
            left: calc(${props => props.styleArgs.left} + ${props => props.styleArgs.inc?'0px':'-100vw'});
        }
        to {
            left: calc(${props => props.styleArgs.left} + 100vw + ${props => props.styleArgs.inc?'0px':'-100vw'});
        }
    }
`

export function FooterCloud({styleArgs}) {
    const innerId = makeId(6)
    return (
        <div>
            <Style styleArgs={styleArgs} innerId={innerId}>
            </Style>
            <Style styleArgs={{...styleArgs, inc:true}} innerId={innerId}>
            </Style>
        </div>
    )
}