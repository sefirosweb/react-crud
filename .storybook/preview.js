import "../scss/app.scss"
import '../src/lib/axiosWithToastr'
import { faker } from '@faker-js/faker';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const TIMEOUT = 600
function get_random(list) {
  return list[Math.floor((Math.random() * list.length))];
}

const mock = new MockAdapter(axios, {
  onNoMatch: 'passthrough',
  delayResponse: TIMEOUT,
})


let generatedData = undefined // cached for same request all times
const createData = () => {
  if (generatedData) return generatedData
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
  console.log('Params sended: ', data.params)
  console.log('Generating mok data.. "generateData"')

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
mock.onPost('/api/crud').reply((request) => generateCrudResponse(request, 'Data inserted correctly'))
mock.onPut('/api/crud').reply((request) => generateCrudResponse(request, 'Data updated correctly'))
mock.onDelete('/api/crud').reply((request) => generateCrudResponse(request, 'Data deleted correctly'))

// End Simple Crud

mock.onGet('/api/get_options').reply(generateDataOptions)

// Crud for list table
mock.onGet('/api/sub_table').reply(generateDataSubtable)
mock.onPost('/api/sub_table').reply((request) => generateCrudResponse(request, 'Added to table'))
mock.onDelete('/api/sub_table').reply((request) => generateCrudResponse(request, 'Deleted from table'))

mock.onGet('/api/sub_table/get_array').reply(generateDataOptions)
// END Crud for list table