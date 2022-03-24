import React, {useEffect, useState} from 'react'
import style from 'styled-components'
import {DefaultPopup} from 'components/popup'

const Style = style.div`
    
`
export const FootScript = function(){
    const [notSupport, setNotSupport] = useState(false)
    useEffect(()=>{
        if(window.innerWidth<768){
            setNotSupport(true)
        }
    },[])
    return (
        <>
            <DefaultPopup portalStyled={Style} portalTarget={'#popup-root'} popupState={[notSupport, setNotSupport]}>
                Drag and drop may not be a good interaction for user in narrow screen or without mouse thus not support here.
                <br/>
                <br/>
                Change your device to get full functionality.
            </DefaultPopup>
        </>
    )
}