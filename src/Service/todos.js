//import axios from 'axios';

import fakeAllTodos, {fakeNewOneTodo} from 'testData/todos'

export async function getAllTodoData(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log('fakeAllTodos', JSON.stringify(fakeAllTodos))
            resolve(fakeAllTodos)
        },1500)
    })
}

export async function getNewOneTodoData(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(fakeNewOneTodo())
        },700)
    })
}