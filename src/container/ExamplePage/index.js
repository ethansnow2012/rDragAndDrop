
import styled from 'styled-components'
import {BasicUsage} from './BasicUsage'
import {H1,H2} from 'components/Headers'

const Styled = styled.div`
    padding-top: 4em;
    padding-left: 2em;
    padding-right: 2em;
    background: #9dbacc;
`

export function ExamplePage() {
    return (
        <Styled>
            <div className="c-blockseparator-1">
                <H1>Minimal Usage With Default Component </H1>
            </div>
            <div className="c-blockseparator-1">
                <BasicUsage></BasicUsage>
            </div>
            
        </Styled>
    )
}