import { faker } from '@faker-js/faker';

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
    for (var i = 1; i <= 5; i++) {
        const cat = faker.commerce.department()
        data.push({
            name: cat,
            category: cat,
            value: i.toString(),
            uuid: faker.string.uuid(),
            description: faker.commerce.productDescription(),
        })
    }

    optionsWithValue = data
    console.log('Options mok generated:', data)
    return optionsWithValue
}
