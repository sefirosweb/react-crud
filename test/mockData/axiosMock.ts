import MockAdapter from 'axios-mock-adapter'
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getData, updateData } from './crudData'
import { filterData } from './filterData';
import { faker } from '@faker-js/faker';
import { generateOptionsValue } from './generateOptionsValue';

export type Options = {
    timetou?: number
}

type GenerateCrudResponse = [number, {
    success: boolean
    message: string
    data: any
}]

export const startMock = (axios: AxiosInstance, options?: Options) => {
    const mock = new MockAdapter(axios, {
        onNoMatch: 'passthrough',
        delayResponse: options?.timetou ?? 600,
    })


    mock.onGet('/api/crud').reply((request) => {
        console.log(`Axios request: '/api/crud' GET`)
        console.log(request)
        return new Promise(function (resolve) {
            const data = getData()

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
        const data = getData()

        const categories = generateOptionsValue()
        const findCategory = categories.find(c => c.value === requestData.category_id)
        requestData.category = findCategory?.name ?? ''
        requestData.uuid = faker.string.uuid()
        requestData.ean = faker.datatype.number({ min: 8000000, max: 9000000 })
        requestData.created_at = new Date();

        data.push(requestData)

        return generateCrudResponse(request, 'Data inserted correctly')
    })

    mock.onPut('/api/crud').reply((request) => {
        console.log(`Axios request: '/api/crud' PUT`)
        const updateData = JSON.parse(request.data)
        console.log({ updateData })
        const uuid = JSON.parse(request.data).uuid

        const data = getData()
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

        updateData(data)
        return generateCrudResponse(request, 'Data updated correctly')
    })

    mock.onDelete('/api/crud').reply((request) => {
        console.log(`Axios request: '/api/crud' DELETE`)
        console.log(JSON.parse(request.data))

        const uuid = JSON.parse(request.data).uuid
        const data = getData()
        const findData = data.findIndex(i => i.uuid === uuid)
        if (findData >= 0) {
            data.splice(findData, 1)
        }

        updateData(data)
        return generateCrudResponse(request, 'Data deleted correctly')
    })
    // End Simple Crud

    mock.onGet('/api/get_options').reply((request) => {
        return new Promise(function (resolve) {
            const data = generateOptionsValue()
            console.log(`Axios request: '/api/get_options' GET`, { data })

            resolve([
                200,
                {
                    success: true,
                    data,
                },
            ])
        })
    })

    // Crud for list table
    mock.onGet('/api/sub_table').reply((request) => {
        return new Promise(function (resolve) {
            const data = getData().splice(0, 5)
            console.log(`Axios request: '/api/sub_table' GET`, {
                params: request.params,
                data
            })
            resolve([
                200,
                {
                    success: true,
                    data,
                },
            ])
        })
    })

    mock.onPost('/api/sub_table').reply((request) => {
        console.log(`Axios request: '/api/sub_table' POST`)
        console.log(JSON.parse(request.data))
        return generateCrudResponse(request, 'Added to table')
    })
    mock.onDelete('/api/sub_table').reply((request) => {
        console.log(`Axios request: '/api/sub_table' DELETE`)
        console.log(JSON.parse(request.data))
        return generateCrudResponse(request, 'Deleted from table')
    })

    return mock
}

const generateCrudResponse = (request: AxiosRequestConfig, message: string): Promise<GenerateCrudResponse> => {
    return new Promise((resolve) => {
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
