
import styled from 'styled-components'
import {BasicUsage} from './BasicUsage'

const Styled = styled.div`
    padding-left: 2em;
    padding-right: 2em;
`

export function ExamplePage() {
    return (
        <Styled>
            <h1>ExamplePage</h1>
            <BasicUsage></BasicUsage>
        </Styled>
    )
}