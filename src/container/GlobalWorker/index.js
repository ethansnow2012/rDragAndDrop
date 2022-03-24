

import {useEffect, useContext, useCallback, useRef} from 'react'
import {useGlobalState} from 'context/GlobalStateProvider'

export function GlobalWorker() {
    const [state, dispatch] = useGlobalState()
    const lastScrollTop = useRef(0)

    const scrollHandle = useCallback(()=>{
        var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop.current){
          if(state.scrollDirection!='down'){
              dispatch({...state, scrollDirection:'down'})
          }
        } else {
          if(state.scrollDirection!='up'){
              dispatch({...state, scrollDirection:'up'})
          }
        }
        lastScrollTop.current = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      }, [state]);

    
    useEffect(() => {
      console.log('rehook')
      function watchScroll() {
        window.addEventListener("scroll", scrollHandle, {passive:true});
      }
      watchScroll();
      // Remove listener (like componentWillUnmount)
      return () => {
        window.removeEventListener("scroll", scrollHandle);
      };
      
    }, [state]);
    return (
        <></>
    )
}