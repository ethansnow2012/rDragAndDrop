
import React from 'react'
import style from 'styled-components'
const Style = style.div`
    font-size: 1.25rem;
    font-weight: bold;
    & strong{
        text-decoration: underline;
    }
`
export const HeaderPopupSubject = function({children}){
    return (
        <Style>
            {children}
        </Style>
    )
}