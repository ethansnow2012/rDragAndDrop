import {faker} from '@faker-js/faker'
let  fakeAllTodos = null
let  fakeNewOneTodo = null
let fakePosts = null
export default fakeAllTodos = {
    id: 'fakeAllTodosId',
    data: [
        {
            id: faker.datatype.uuid(),
            title: faker.name.findName(),
            data: [
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                }
            ]
        },
        {
            id: faker.datatype.uuid(),
            title: faker.name.findName(),
            data: [
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                }
            ]
        },
        {
            id: faker.datatype.uuid(),
            title: faker.name.findName(),
            data: [
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                }
            ]
        },
        {
            id: faker.datatype.uuid(),
            title: faker.name.findName(),
            data: [
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                }
            ]
        },
        {
            id: faker.datatype.uuid(),
            title: faker.name.findName(),
            data: [
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                },
                {
                    id: faker.datatype.uuid(),
                    title: faker.name.findName(),
                    job_title:"Job: "+faker.name.jobType()
                }
            ]
        }
    ]
}

fakeNewOneTodo = ()=>{
    let _isNew = true
    const handler1 = {
        get(target, prop, receiver) {
            if (prop === "isNew") {
                let temp = _isNew
                _isNew = false
                return temp;
            }
            return Reflect.get(...arguments);
        }
    }
    return new Proxy({
            id: faker.datatype.uuid(),
            title: faker.name.findName(),
            job_title:"Job: "+faker.name.jobType()
        }, 
        handler1
    )
}

fakePosts = ()=>{
    return { // root
        id: faker.datatype.uuid(),
        title: faker.name.findName(),
        job_title:"Job: "+faker.name.jobType(),
        data: [
            {
                id: faker.datatype.uuid(),
                title: faker.name.findName(),
                job_title:"Job: "+faker.name.jobType(),
                x: 150,
                y: 80,
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
            },
            {
                id: faker.datatype.uuid(),
                title: faker.name.findName(),
                job_title:"Job: "+faker.name.jobType(),
                x: 700,
                y: 200,
                data: [
                    {
                        id: faker.datatype.uuid(),
                        title: "post22222",
                        content: "post22222 content",
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