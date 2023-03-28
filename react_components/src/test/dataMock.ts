import { faker } from '@faker-js/faker';
import axios, { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { matchString } from '../lib';

export type Options = {
    timetou?: number
}

export type GeneratedData = {
    uuid: string;
    value: string;
    ean: number;
    name: string;
    description: string | null;
    price: number;
    category: any;
    category_id: any;
    categories: Array<any>;
    created_at: string;
}

let generatedData: Array<GeneratedData> | undefined = undefined
let optionsWithValue: Array<OptionsType> | undefined = undefined

type OptionsType = {
    name: string;
    category: string;
    value: string;
    uuid: string;
    description: string;
}

type GenerateDataOptions = [number, {
    success: boolean
    data: any
}]

type GenerateCrudResponse = [number, {
    success: boolean
    message: string
    data: any
}]

type GenerateDataSubtable = [number, {
    success: boolean
    data: Array<GeneratedData>
}]

export const startMock = (options?: Options) => {
    const mock = new MockAdapter(axios, {
        onNoMatch: 'passthrough',
        delayResponse: options?.timetou ?? 600,
    })


    mock.onGet('/api/crud').reply((request) => {
        console.log(`Axios request: '/api/crud' GET`)
        console.log(request)
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
        console.log(updateData)
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
        console.log(JSON.parse(request.data))

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

    mock.onGet('/api/get_options').reply((request) => {
        console.log(`Axios request: '/api/get_options' GET`)
        return generateDataOptions(request)
    })

    // Crud for list table
    mock.onGet('/api/sub_table').reply((request) => {
        console.log(`Axios request: '/api/sub_table' GET`)
        return generateDataSubtable(request)
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

export function get_random<T>(list: Array<T>) {
    return list[Math.floor((Math.random() * list.length))];
}

export const createData = () => {
    if (generatedData) {
        generatedData.sort((a, b) => (new Date(b.created_at)).getTime() - (new Date(a.created_at)).getTime())
        return generatedData
    }

    console.log('Generating mok data.. "generateData"')
    const random = Math.floor(Math.random() * 200) + 40
    const data: Array<GeneratedData> = []
    for (var i = 0; i < random; i++) {

        const category = get_random(generateOptionsValue())

        const uuid = faker.datatype.uuid()
        data.push({
            uuid: uuid,
            value: uuid,
            ean: faker.datatype.number({ min: 8000000, max: 9000000 }),
            name: faker.commerce.product(),
            description: Math.random() < 0.8 ? faker.commerce.productDescription() : null,
            price: parseFloat(faker.commerce.price()) + 0.99,
            category: category.name,
            category_id: category.value,
            created_at: faker.date.recent(10).toISOString(),
            categories: [
                get_random(generateOptionsValue()),
                get_random(generateOptionsValue())
            ]
        })
    }

    generatedData = data
    console.log('data created: ', data)
    return generatedData
}

export const generateOptionsValue = () => {
    if (optionsWithValue) return optionsWithValue
    const data: Array<OptionsType> = []
    for (var i = 0; i < 5; i++) {
        const cat = faker.commerce.department()
        data.push({
            name: cat,
            category: cat,
            value: i.toString(),
            uuid: faker.datatype.uuid(),
            description: faker.commerce.productDescription(),
        })
    }

    optionsWithValue = data
    console.log('Options mok generated:', data)
    return optionsWithValue
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

const generateDataOptions = (request?: AxiosRequestConfig): Promise<GenerateDataOptions> => {
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


const generateDataSubtable = (request?: AxiosRequestConfig): Promise<GenerateDataSubtable> => {
    return new Promise(function (resolve) {
        const data = createData().splice(0, 5)
        resolve([
            200,
            {
                success: true,
                data,
            },
        ])
    })
}

const matchGlobalFilter = (row: Record<string, string | number>, valueParam: string | number) => {
    if (valueParam === '') return true
    let result = false

    Object.entries(row).every((entry) => {
        if (matchString(entry[1], valueParam)) {
            result = true
            return false
        }
        return true
    })

    return result
}

const filterData = (row: any, params: Record<string, FilterType>) => {
    let result = true
    let globalFilter = true

    Object.entries(params).every(paramEntry => {
        const keyParam = paramEntry[0]
        const valueParam = paramEntry[1]

        if (keyParam === 'globalFilter' && typeof valueParam === "string") {
            if (matchGlobalFilter(row, valueParam)) {
                globalFilter = true
            } else {
                globalFilter = false
            }
            return true
        }

        if (typeof row[keyParam] === "undefined") {
            return true
        }

        if (
            (typeof valueParam === "string") &&
            !matchString(row[keyParam], valueParam)
        ) {
            result = false
            return false
        }

        if (
            (Array.isArray(valueParam) && !isNaN(valueParam[0]))
            && row[keyParam] < valueParam[0]
        ) {
            result = false
            return false
        }

        if (
            (Array.isArray(valueParam) && !isNaN(valueParam[1]))
            && row[keyParam] > valueParam[1]
        ) {
            result = false
            return false
        }

        return true
    })

    return globalFilter && result
}

export default {
    startMock,
}
