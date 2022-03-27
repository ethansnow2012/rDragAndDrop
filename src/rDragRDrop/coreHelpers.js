



export const setCssPositionViaRef = (refOrHTML, x, y)=>{
    const target = refOrHTML instanceof HTMLElement ? refOrHTML : refOrHTML.current // accept ref or HTMLElement
    target.style.setProperty("---x", x+"px");
    target.style.setProperty("---y", y+"px");
}

export const setCssPositionComplementViaRef = (ref, x, y)=>{
    ref.current.style.setProperty("---x_complement", x+"px");
    ref.current.style.setProperty("---y_complement", y+"px");
}

export const calcMousePosition = (ev, targetElement)=>{
    const top = targetElement.current.getBoundingClientRect().top
    const left = targetElement.current.getBoundingClientRect().left
    return {
        x: ev.clientX - left,
        y: ev.clientY - top
    }
}