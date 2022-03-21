
import styled from 'styled-components'
import {BasicUsage} from './BasicUsage'

const Styled = styled.div`
    padding-top: 4em;
    padding-left: 2em;
    padding-right: 2em;
    background: #d2c1a2;
`

export function ExamplePage() {
    return (
        <Styled>
            <h1>ExamplePage</h1>
            <BasicUsage></BasicUsage>
        </Styled>
    )
}