import '../sass/app.scss'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const TIMEOUT = 800

const mock = new MockAdapter(axios, {
    onNoMatch: 'passthrough',
    delayResponse: TIMEOUT,
})

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

const generateOptions = () => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve([
                200,
                {
                    success: true,
                    data: options,
                },
            ])
        }, TIMEOUT)
    })
}

const optionsWithValue = [
    {
        name: 'Door 1',
        value: '15',
    },
    {
        name: 'Desktop 2',
        value: '33',
    },
    {
        name: 'Computer 3',
        value: '412',
    },
    {
        name: 'Loktar 4',
        value: '132312',
    },
]

const makeRandomText = (length) => {
    let result = ''
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 '
    const charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}

const createData = () => {
    const random = Math.floor(Math.random() * 300) + 1
    const data = []
    for (var i = 0; i < random; i++) {
        data.push({
            id: makeRandomText(5),
            ean: makeRandomText(8),
            sku_base: makeRandomText(9),
            descripcion: makeRandomText(50),
            name: makeRandomText(7),
            field_type: options[Math.floor(Math.random() * options.length)],
            check_box: Math.random() > 0.5 ? 'true' : 'false',
        })
    }

    return data
}

const generateData = () => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const data = createData()
            resolve([
                200,
                {
                    success: true,
                    data,
                },
            ])
        }, TIMEOUT)
    })
}

const createultiSelectData = () => {
    const random = Math.floor(Math.random() * 7) + 1
    const data = []
    for (var i = 0; i < random; i++) {
        data.push({
            id: makeRandomText(5),
            name: makeRandomText(7),
            description: makeRandomText(20),
        })
    }
    return data
}

const generateMultiSelectData = () => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const data = createultiSelectData()
            resolve([
                200,
                {
                    success: true,
                    data,
                },
            ])
        }, TIMEOUT)
    })
}

mock.onGet('/api/crud').reply(generateData)
mock.onPost('/api/crud').reply(200, {
    success: true,
    message: 'Data inserted correctly',
})
mock.onPut('/api/crud').reply(200, {
    success: true,
    message: 'Data updated correctly',
})
mock.onDelete('/api/crud').reply(200, {
    success: true,
    message: 'Data deleted correctly',
})

mock.onGet('/api/getSelectOptions').reply(200, {
    success: true,
    data: optionsWithValue,
})

mock.onGet('/api/getSelectOptionsWithValue').reply(generateOptions)

mock.onGet('/api/multiselect').reply(generateMultiSelectData)
mock.onPost('/api/multiselect').reply(200, {
    success: true,
    message: 'Data inserted correctly',
})
mock.onDelete('/api/multiselect').reply(200, {
    success: true,
    message: 'Data deleted correctly',
})

mock.onGet('/api/multiselect/get_array').reply(200, {
    success: true,
    data: options,
})

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
}
