import {faker} from '@faker-js/faker'
let  fakeTodos = []
export default fakeTodos = {
    id: 'fakeTodosId',
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
        }
    ]
}
