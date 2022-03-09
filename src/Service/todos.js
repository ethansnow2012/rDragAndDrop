//import axios from 'axios';

import fakeTodos from 'testData/todos'

export async function getTodoData(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(fakeTodos)
        },1500)
    })
}