
import styled from 'styled-components'
import {useGlobalState} from 'context/GlobalStateProvider'
import {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {baseName} from 'App'

const Styled = styled.div`
    position:relative;
    height:0;
    z-index: 1000;
    transition: top 1.5s ease;
    top:0px;
    &.down{
        top:-100px;
    }
    & .topNavigation-block{
        position:absolute;
        right:0;
        top:0;
        background-color: black !important;
        height: 120px;
        width: 120px;
        transform: rotate(37deg) translate(-14px, -52px);
        width: 120px;

    }
    & .topNavigation-block-menu{
        position: absolute;
        top: 56px;
        right: 22px;
        width: 18px;
        height: 18px;
        transition: right 1.5s ease;
        cursor: pointer;
    }
    &.isMenuOpen .topNavigation-block-menu::after{
        content:'';
        position: absolute;
        width: 100%;
        height: 1px;
        background: white;
        left:0;
        bottom:-4px;
        opacity:0.7;
    }
    
    & .topNavigation-text{
        position:absolute;
        top:1em;
        right: 2em;
        color:white;
        mix-blend-mode: screen;
    }
    & .topNavigation-text a{
        padding: 0;
    }
    & .topNavigation-text-inner-line{
        position: relative;
        height: 1px;
        width: 100%;
        right: -10px;
        top: 2px;
        background: white;
    }
    &.isMenuClosed .topNavigation-block{
        animation-duration: 1.5s;
        animation-name: closeMenu;
        animation-fill-mode: forwards;
    }
    &.isMenuOpen .topNavigation-block-menu-content{
        animation: delayedVisibilityShow 1.5s linear forwards;
    }
    &.isMenuClosed .topNavigation-block-menu-content{
        animation: delayedVisibilityHide 1.5s linear forwards;
    }
    &.isMenuOpen .topNavigation-block{
        animation-duration: 1.5s;
        animation-name: openMenu;
        animation-fill-mode: forwards;
    }
    &.isMenuOpen .topNavigation-block-menu{
        right: 8px;
    }
    & .topNavigation-block-menu-content{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 150px;
        padding-top: 7px;
        visibility:hidden;
    }
    & .topNavigation-block-menu-content-i{
        padding: 7px 14px;
        position: relative;
        display: block;
        color: wheat !important;
        text-decoration: auto;
    }
    & .topNavigation-block-menu-content-i::after{
        content: '→';
        display: inline-block;
        margin-right: 15px;
        float: right;
        position: relative;
        top: 1px;
    }
    @keyframes delayedVisibilityShow {
        0%{
            visibility: hidden;
        }
        30%{
            visibility: visible;
        }
        100%{
            visibility: visible;
        } 
    }
    @keyframes delayedVisibilityHide {
        0%{
            visibility: visible;
        }
        70%{
            visibility: hidden;
        }
        100%{
            visibility: hidden;
        } 
    }
    @keyframes openMenu {
        0%{
            transform: rotate(37deg) translate(-14px, -52px);
            width: 120px;
        }
        30%{
            transform: 
                rotate(0deg) 
                translate(-0px, -52px);
            width: 135px;
        }
        40%{
            transform: 
                rotate(0deg) 
                translate(-0px, -52px);
            width: 135px;
        }
        100%{
            transform: rotate(0deg) translate(0px, -52px);
            height: 280px;
            width: 135px;
        }
        
    }
    @keyframes closeMenu {
        0% {
            transform: 
                rotate(0deg) 
                translate(-0px, -52px);
            width: 135px;
            height: 280px;
        }
        60% {
            transform: 
                rotate(0deg) 
                translate(-0px, -52px);
            width: 135px;
        }
        70% {
            transform: 
                rotate(0deg) 
                translate(-0px, -52px);
            width: 135px;
        }
        100% {
            transform: rotate(37deg) translate(-14px, -52px);
            width: 120px;
        }
    }
`
export function TopNavigation() {
    const [state, dispatch] = useGlobalState()
    const [isMenuOpen, setIsMenuOpen] = useState(null)
    
    const clickMenuOpen = ()=>{
        console.log('clickMenuOpen')
        setIsMenuOpen(!isMenuOpen)
    }
    useEffect(()=>{
        if(state.scrollDirection=='down'&&isMenuOpen){
            setIsMenuOpen(false)
        }
    } ,[state.scrollDirection])
    return (
        <div style={{position:'fixed', top: 0, overflow: 'visible', zIndex: 1000, width:'100%' }}>
        <Styled
            className={ (state.scrollDirection??'') + (isMenuOpen==null?'':(isMenuOpen?' isMenuOpen':' isMenuClosed')) }
        >
            <div className="topNavigation-block">
                <div className="topNavigation-block-menu-content">
                    <Link  to={baseName+'/example'} className="topNavigation-block-menu-content-i">Example</Link>
                    <a  href="https://github.com/ethansnow2012/rdrag-rdrop" className="topNavigation-block-menu-content-i">Github</a>
                </div>
            </div>
            <div className="topNavigation-block-menu" onClick={clickMenuOpen}>
                <svg  style={{'---svg-fill':'white', 'width': '100%', 'height': '100%'}}>
                    <use href="#svg-nine-dot" ></use>
                </svg>
            </div>
            
            <div className="topNavigation-text">
                <Link  to={baseName+'/'} className="topNavigation-block-menu-content-i">rDrag-rDrop.js</Link>
                <div className="topNavigation-text-inner">
                    <div className="topNavigation-text-inner-line"></div>
                </div>
            </div>
        </Styled>
        </div>
    )
}