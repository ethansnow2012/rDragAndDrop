
import { render, screen } from '@testing-library/react'
import {rDragRDrop, rDragRDropContext, defaultComponents} from 'rDragRDrop'
test('defaultComponents have root,wrapper,target', ()=>{
    const {
        root,
        wrapper,
        target
    } = defaultComponents

    expect(root).toBeTruthy();
    expect(wrapper).toBeTruthy();
    expect(target).toBeTruthy();
})