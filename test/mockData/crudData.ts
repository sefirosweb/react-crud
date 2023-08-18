import { faker } from '@faker-js/faker';
import { GeneratedData, generateOptionsValue } from "../dataMock"
import { generateRandomString } from "./generateRandomString"
import { getRandom } from "./getRandom"

const generatedData: Array<GeneratedData> = []

export const getData = () => {
    if (generatedData.length > 0) {
        generatedData.sort((a, b) => (new Date(b.created_at)).getTime() - (new Date(a.created_at)).getTime())
        return generatedData
    }

    console.log('Generating mok data.. "generateData"')
    const random = Math.floor(Math.random() * 200) + 40
    const data: Array<GeneratedData> = []
    for (var i = 0; i < random; i++) {

        const category = getRandom(generateOptionsValue())

        const uuid = faker.string.uuid()
        data.push({
            uuid: uuid,
            value: uuid,
            ean: faker.number.int(8000000, 9000000).toString(),
            name: faker.commerce.product(),
            description: Math.random() < 0.4 ? faker.commerce.productDescription() : null,
            random: Math.random() < 0.4 ? generateRandomString(10) : null,
            price: parseFloat(faker.commerce.price()) + 0.99,
            category: category.name,
            category_id: category.value,
            created_at: faker.date.recent({ days: 10 }).toISOString(),
            categories: [
                getRandom(generateOptionsValue()),
                getRandom(generateOptionsValue())
            ]
        })
    }

    generatedData.push(...data)
    console.log('data created: ', data)
    return generatedData
}

export const updateData = (data: Array<GeneratedData>) => {
    generatedData.splice(0, generatedData.length)
    generatedData.push(...data)
}