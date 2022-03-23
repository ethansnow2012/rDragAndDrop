
import React from 'react'
import style from 'styled-components'
const Style = style.div`
    font-size: 1.25rem;
    font-weight: bold;
    & strong{
            text-decoration: underline;
    }
    &.ov-h2{
        font-size: 1.1rem;
    }
`
export const HeaderForPopupH1 = function({children}){
    return (
        <Style>
            {children}
        </Style>
    )
}
export const HeaderForPopupH2 = function({children}){
    return (
        <Style className='ov-h2'>
            {children}
        </Style>
    )
}