
import { render, screen, queryByAttribute, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {rDragRDrop, rDragRDropContext, defaultComponents} from 'rDragRDrop'
import { useState, useEffect } from 'react'


test('rDragRDrop exposes corresponding object root,wrapper,target', ()=>{
    const {
        root,
        wrapper,
        target
    } = defaultComponents
    
    expect(root).toBeTruthy();
    expect(wrapper).toBeTruthy();
    expect(target).toBeTruthy();
    expect(rDragRDrop.isDescendantOrSelf).toBeTruthy();
    expect(rDragRDrop.initContext).toBeTruthy();
    expect((rDragRDropContext.$$typeof).toString()).toBe('Symbol(react.context)');
})

test('integration test: add, remove', async ()=>{
    function TestTemplate() {
        const contextInstance = rDragRDrop.initContext()()
        const [dataState, setDataState] = useState(initData)
        const contextObject = {
            data: dataState, 
            setData: setDataState, 
            contextInstance: contextInstance
        }
        // decompose
        const {
            root: _root,
            wrapper: _wrapper,
            target: _target
            } = defaultComponents
        const {Element: Root, DefaultStyle: RootStyle} = _root
        const {Element: Wrapper, DefaultStyle: WrapperStyle} = _wrapper
        const {Element: Target, DefaultStyle: TargetStyle} = _target
        // end of decompose
        const clickEventTriggerElementRemove = ()=>{
            setDataState((_data)=>{
                _data.data.splice(1, 1)
                return {..._data}
            })
        }
        const clickEventTriggerElementAdd = ()=>{
            setDataState((_data)=>{
                _data.data.push(randomWrapperData)
                return {..._data}
            })
        }
        return (  
            <rDragRDropContext.Provider value={contextObject}>
                <div id="event-trigger-element-remove1" onClick={clickEventTriggerElementRemove}>
                    event-trigger-element-remove1
                </div>
                <div id="event-trigger-element-add1" onClick={clickEventTriggerElementAdd}>
                    event-trigger-element-add1
                </div>
                <Root>
                    {
                        dataState.data
                            ?.map((wrapperData) =>
                            {
                                return(  
                                    <Wrapper key={wrapperData.id} self={wrapperData} parent={dataState.data}>
                                        {
                                            wrapperData.data
                                                .map((target, ii)=>(
                                                    <Target key={target.id} self={target} parent={wrapperData}>
                                                        <div className='black-block'>{target.title}</div>
                                                    </Target>
                                                ))
                                        }
                                    </Wrapper>
                                )
                            }
                        )
                    }
                </Root>
            </rDragRDropContext.Provider>                    
        )
    }
    const dom = render(<TestTemplate/>)
    
    // assert element rendered on the screen
    expect(screen.getByText('one')).toBeTruthy()
    expect(screen.getByText('five')).toBeTruthy()
    expect(screen.getByText('nine')).toBeTruthy()
    
    const getById = queryByAttribute.bind(null, 'id');

    const btnRemove = getById(dom.container, 'event-trigger-element-remove1');
    const btnAdd = getById(dom.container, 'event-trigger-element-add1');
   
    userEvent.click(btnRemove)

    const elSix = dom.queryByText('six')//screen.getByText('six')
    // waitForElementToBeRemoved(elSix).then(() =>
    //     console.log('Element(six) no longer in DOM'),
    // )
    expect(elSix).toBeFalsy()

    userEvent.click(btnAdd)

    const el777 = dom.queryByText('777')

    expect(el777).toBeTruthy()
})

const initData = {
    "id":"sssfsdfsfjklhjkg",
    "title":"Title for the Wrapper",
    "data":[
       {
          "id":"01588147-106e-45dd-b54d-ed71da05fb77",
          "title":"Human Intranet Executive",
          "data":[
             {
                "id":"eaed08e2-9891-4b94-a06e-1473f660ba43",
                "title":"one"
             },
             {
                "id":"5dec03ae-2b1a-4b16-af51-d7f8fae4f18e",
                "title":"two"
             },
             {
                "id":"b4070ebd-f0cf-4648-bbb0-7f0ba2395f9b",
                "title":"three"
             },
             {
                "id":"8860187a-96e0-4b36-b6d2-a4f6adede779",
                "title":"four"
             },
             {
                "id":"dab6c1c5-de9b-4846-9c2c-ad67417fd8ca",
                "title":"five"
             }
          ]
       },
       {
          "id":"4a107b1a-c157-4c98-b7df-26935153d7a2",
          "title":"Human Configuration Executive2",
          "data":[
             {
                "id":"91a93433-618e-45db-82b5-033d3e72ddff",
                "title":"six"
             }
          ]
       },
       {
          "id":"94dc9b15-68a8-4502-8ce4-4d802e7e7e45",
          "title":"Central Group Technician",
          "data":[
             {
                "id":"1d75ec54-9504-486c-853b-ee793ad2679c",
                "title":"seven"
             },
             {
                "id":"fd747ded-f92e-4ead-a5cc-0bd8e5eea9bd",
                "title":"eight"
             }
          ]
       },
       {
          "id":"d621f0bc-20f2-4d95-bd45-deb3dcf309bf",
          "title":"Lead Usability Specialist",
          "data":[
             {
                "id":"b12803c1-4566-4d60-b420-a501b35f07c6",
                "title":"nine"
             },
             {
                "id":"4e8b12e8-5aea-408b-97ee-2f79c945f0fb",
                "title":"ten"
             }
          ]
       }
    ]
 }

const randomWrapperData = {
    "id":"4sdsdfab1a-sdf-dfdf-b7df-gdfah353523",
    "title":"I am new111",
    "data":[
       {
          "id":"gljhklfgj-hdmjlhsjdfg-gnerjltekt",
          "title":"777"
       }
    ]
 }

 