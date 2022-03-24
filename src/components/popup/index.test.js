import { render, screen, cleanup } from '@testing-library/react'
import { DefaultPopup } from './index.js'
import styled from 'styled-components'
import {useState} from 'react'


const portalStyled = styled.div`
    .p-codepopup > * + *{
        margin-top:1.5rem;
    }
`

function TestComponent({ url }) {
    const [popupState, setPopupState] = useState(true)
    return (  
        <DefaultPopup portalStyled={portalStyled} portalTarget={'body'} popupState={[popupState, setPopupState]} className='p-codepopup'></DefaultPopup>
    )
}

function renderMyPortal() {
    const renderUtils = render(<TestComponent />)

    return renderUtils
  }

beforeEach(cleanup)

test('Mount the default popup', ()=>{
    const {unmount} = renderMyPortal(<TestComponent />)
    
    expect(document.body.querySelector('.p-codepopup')).toBeTruthy()
    unmount()
    expect(document.body.querySelector('.p-codepopup')?true:false).toBeFalsy()
})