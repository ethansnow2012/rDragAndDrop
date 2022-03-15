import {faker} from '@faker-js/faker'
let  fakeAllTodos = null
let  fakeNewOneTodo = null
let fakePosts = null
export default fakeAllTodos = {
    id: 'fakeAllTodosId',
    data: [
        {
            id: faker.datatype.uuid(),
            title: faker.name.jobTitle(),
            data: [
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName()
                }
            ]
        },
        {
            id: faker.datatype.uuid(),
            title: faker.name.jobTitle(),
            data: [
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName()
                }
            ]
        },
        {
            id: faker.datatype.uuid(),
            title: faker.name.jobTitle(),
            data: [
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName()
                }
            ]
        },
        {
            id: faker.datatype.uuid(),
            title: faker.name.jobTitle(),
            data: [
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName()
                }
            ]
        }
    ]
}

fakeNewOneTodo = ()=>{
    return {
        id: faker.datatype.uuid(),
        title: faker.name.findName()
    }    
}

fakePosts = ()=>{
    return { // root
        id: faker.datatype.uuid(),
        title: faker.name.findName(),
        data: [
            {
                id: faker.datatype.uuid(),
                title: faker.name.findName(),
                data: [
                    {
                        id: faker.datatype.uuid(),
                        title: "post1",
                        content: "post1 content",
                        postion: {x:10, y:30}
                    },
                    {
                        id: faker.datatype.uuid(),
                        title: "post2",
                        content: "post2 content",
                        postion: {x:30, y:40}
                    },   
                    {
                        id: faker.datatype.uuid(),
                        title: "post3",
                        content: "post3 content",
                        postion: {x:70, y:34}
                    },   
                    {
                        id: faker.datatype.uuid(),
                        title: "post4",
                        content: "post4 content",
                        postion: {x:80, y:32}
                    }       
                ]
            }
        ]
    }    
}
export {
    fakeNewOneTodo,
    fakePosts
}