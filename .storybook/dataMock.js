

import { faker } from '@faker-js/faker';
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const TIMEOUT = 600
export function get_random(list) {
    return list[Math.floor((Math.random() * list.length))];
}

const mock = new MockAdapter(axios, {
    onNoMatch: 'passthrough',
    delayResponse: TIMEOUT,
})


let generatedData = undefined // cached for same request all times
export const createData = () => {
    if (generatedData) return generatedData
    console.log('Generating mok data.. "generateData"')
    const random = Math.floor(Math.random() * 1000) + 1
    const data = []
    for (var i = 0; i < random; i++) {

        const category = get_random(generateOptionsValue())

        data.push({
            uuid: faker.datatype.uuid(),
            ean: faker.datatype.number({ min: 8000000, max: 9000000 }),
            name: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()) + 0.99,
            category: category.name,
            category_id: category.value,
            created_at: faker.date.recent()
        })
    }

    generatedData = data
    console.log('data created: ', data)
    return generatedData
}

let optionsWithValue = undefined
export const generateOptionsValue = () => {
    if (optionsWithValue) return optionsWithValue
    const data = []
    for (var i = 0; i < 5; i++) {
        data.push({
            name: faker.commerce.department(),
            value: faker.datatype.number({ min: 1, max: 10000 }).toString()
        })
    }

    optionsWithValue = data
    console.log('Options mok generated:', data)
    return optionsWithValue
}


const generateData = (data) => {

    return new Promise(function (resolve) {
        const data = createData()
        resolve([
            200,
            {
                success: true,
                data,
            },
        ])
    })
}


const generateCrudResponse = (request, message) => {
    return new Promise(function (resolve) {
        resolve([
            200,
            {
                success: true,
                message,
                data: request.data
            },
        ])
    })
}

const generateDataOptions = (request) => {
    console.log('Request to: generateDataOptions', request)
    return new Promise(function (resolve) {
        const data = generateOptionsValue()

        resolve([
            200,
            {
                success: true,
                data,
            },
        ])
    })
}

const generateDataSubtable = () => {
    return new Promise(function (resolve) {
        const data = createData()
        resolve([
            200,
            {
                success: true,
                data,
            },
        ])
    })
}

// Simple CRUD
mock.onGet('/api/crud').reply(generateData)
mock.onPost('/api/crud').reply((request) => {
    const requestData = JSON.parse(request.data)
    const data = createData()

    const categories = generateOptionsValue()
    const findCategory = categories.find(c => c.value === requestData.category_id)
    requestData.category = findCategory?.name ?? ''
    requestData.uuid = faker.datatype.uuid()
    requestData.ean = faker.datatype.number({ min: 8000000, max: 9000000 })
    requestData.created_at = new Date();

    data.push(requestData)

    return generateCrudResponse(request, 'Data inserted correctly')
})

mock.onPut('/api/crud').reply((request) => {
    const updateData = JSON.parse(request.data)
    const uuid = JSON.parse(request.data).uuid
    const data = createData()
    const findData = data.findIndex(i => i.uuid === uuid)
    if (findData >= 0) {
        const categories = generateOptionsValue()

        const findCategory = categories.find(c => c.value === updateData.category_id)
        updateData.category = findCategory?.name ?? ''

        data[findData] = {
            ...data[findData],
            ...updateData
        }
    }

    generatedData = data;
    return generateCrudResponse(request, 'Data updated correctly')
})

mock.onDelete('/api/crud').reply((request) => {
    const uuid = JSON.parse(request.data).uuid
    const data = createData()
    const findData = data.findIndex(i => i.uuid === uuid)
    if (findData >= 0) {
        data.splice(findData, 1)
    }

    generatedData = data;
    return generateCrudResponse(request, 'Data deleted correctly')
})
// End Simple Crud

mock.onGet('/api/get_options').reply(generateDataOptions)

// Crud for list table
mock.onGet('/api/sub_table').reply(generateDataSubtable)
mock.onPost('/api/sub_table').reply((request) => generateCrudResponse(request, 'Added to table'))
mock.onDelete('/api/sub_table').reply((request) => generateCrudResponse(request, 'Deleted from table'))

mock.onGet('/api/sub_table/get_array').reply(generateDataOptions)
// END Crud for list table