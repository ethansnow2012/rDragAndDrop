import { render, screen } from '@testing-library/react'
import { HeaderForPopupH1, HeaderForPopupH2 } from '../index.js'

test('HeaderForPopup render text', ()=>{
    const renderRTN = render(
        <div>
            <HeaderForPopupH2>fdhdfhfdhj</HeaderForPopupH2>
            <HeaderForPopupH1>aagfsdgsdfgaa</HeaderForPopupH1>
        </div>
    )
    //console.log(renderRTN)
    expect(screen.getByText('aagfsdgsdfgaa')).toBeDefined();
    expect(screen.getByText('fdhdfhfdhj')).toBeDefined();
})