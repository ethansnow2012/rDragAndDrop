import {faker} from '@faker-js/faker'
let  fakeAllTodos = null
let  fakeNewOneTodo = null
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
export {
    fakeNewOneTodo
}