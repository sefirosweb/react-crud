

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
    if (generatedData) {
        generatedData.sort((a, b) => b.created_at - a.created_at)
        return generatedData
    }

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


const matchGlobalFilter = (row, valueParam) => {
    if (valueParam === '') return true
    let result = false
    Object.entries(row).every((entry) => {

        const value = typeof entry[1] === 'number' ? entry[1].toString() : entry[1]
        if (typeof value === 'string') {
            if (value.includes(valueParam)) {
                result = true
                return false
            }
        }

        return true

    })

    return result
}

const filterData = (row, params) => {
    let result = true
    let globalFilter = false
    Object.entries(params).every(paramEntry => {

        const keyParam = paramEntry[0]
        const valueParam = paramEntry[1]

        console.log({ keyParam })

        if (keyParam === 'globalFilter') {
            if (valueParam === '') {
                globalFilter = true
            } else if (matchGlobalFilter(row, valueParam)) {
                globalFilter = true
            }
        } else if (!row[keyParam].includes(valueParam)) {
            result = false
            return false
        }

        return true
    })

    return globalFilter && result
}

mock.onGet('/api/crud').reply((request) => {
    console.log(`Axios request: '/api/crud' GET`)
    return new Promise(function (resolve) {
        const data = createData()

        const filteredData = data.filter(row => {
            if (!request.params) return true
            if (Object.keys(request.params).length === 0) return true

            return filterData(row, request.params)
        })

        resolve([
            200,
            {
                success: true,
                data: filteredData,
            },
        ])
    })
})

mock.onPost('/api/crud').reply((request) => {
    console.log(`Axios request: '/api/crud' POST`)

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
    console.log(`Axios request: '/api/crud' PUT`)

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
    console.log(`Axios request: '/api/crud' DELETE`)

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

mock.onGet('/api/get_options').reply(() => {
    console.log(`Axios request: '/api/get_options' GET`)
    return generateDataOptions()
})

// Crud for list table
mock.onGet('/api/sub_table').reply(() => {
    console.log(`Axios request: '/api/sub_table' GET`)
    return generateDataSubtable()
})

mock.onPost('/api/sub_table').reply((request) => {
    console.log(`Axios request: '/api/sub_table' POST`)
    return generateCrudResponse(request, 'Added to table')
})
mock.onDelete('/api/sub_table').reply((request) => {
    console.log(`Axios request: '/api/sub_table' DELETE`)
    return generateCrudResponse(request, 'Deleted from table')
})

mock.onGet('/api/sub_table/get_array').reply(() => {
    console.log(`Axios request: '/api/sub_table/get_array' GET`)
    return generateDataOptions()
})
// END Crud for list table


/** Console logs is for detect multiple request on axios and optimize them **/