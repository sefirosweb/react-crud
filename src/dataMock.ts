import { faker } from '@faker-js/faker';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { matchString } from './module/lib';

const TIMEOUT = 600

const mock = new MockAdapter(axios, {
    onNoMatch: 'passthrough',
    delayResponse: TIMEOUT,
})

export function get_random<T>(list: Array<T>) {
    return list[Math.floor((Math.random() * list.length))];
}

export type GeneratedData = {
    uuid: string;
    value: string;
    ean: number;
    name: string;
    description: string;
    price: number;
    category: any;
    category_id: any;
    created_at: string;
}

let generatedData: Array<GeneratedData> | undefined = undefined
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
            description: faker.commerce.productDescription(),
            price: parseFloat(faker.commerce.price()) + 0.99,
            category: category.name,
            category_id: category.value,
            created_at: faker.date.recent(10).toISOString()
        })
    }

    generatedData = data
    console.log('data created: ', data)
    return generatedData
}

type OptionsType = {
    name: string;
    category: string;
    value: string;
    uuid: string;
    description: string;
}

let optionsWithValue: Array<OptionsType> | undefined = undefined
export const generateOptionsValue = () => {
    if (optionsWithValue) return optionsWithValue
    const data: Array<OptionsType> = []
    for (var i = 0; i < 5; i++) {
        const cat = faker.commerce.department()
        data.push({
            name: cat,
            category: cat,
            value: faker.datatype.number({ min: 1, max: 10000 }).toString(),
            uuid: faker.datatype.uuid(),
            description: faker.commerce.productDescription(),
        })
    }

    optionsWithValue = data
    console.log('Options mok generated:', data)
    return optionsWithValue
}

type GenerateCrudResponse = [number, {
    success: boolean
    message: string
    data: any
}]

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


type GenerateDataOptions = [number, {
    success: boolean
    data: any
}]
const generateDataOptions = (request?: AxiosResponse): Promise<GenerateDataOptions> => {
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


type GenerateDataSubtable = [number, {
    success: boolean
    data: Array<GeneratedData>
}]

const generateDataSubtable = (): Promise<GenerateDataSubtable> => {
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