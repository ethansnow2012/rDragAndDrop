



export const setCssPositionViaRef = (ref, x, y)=>{
    ref.current.style.setProperty("---x", x+"px");
    ref.current.style.setProperty("---y", y+"px");
}

export const setCssPositionComplementViaRef = (ref, x, y)=>{
    ref.current.style.setProperty("---x_complement", x+"px");
    ref.current.style.setProperty("---y_complement", y+"px");
}

export const calcMousePosition = (ev, targetElement)=>{
    console.log("yy", ev.pageY, targetElement.current.offsetTop)
    const top = targetElement.current.getBoundingClientRect().top
    const left = targetElement.current.getBoundingClientRect().left
    return {
        x: ev.clientX - left,
        y: ev.clientY - top
    }
}