import axios from 'axios'

export const getFormTypeData = (url?: string) => {
    if (!url) return
    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((request) => resolve(request.data))
            .catch(reject)
    })
}

export const getInputDataField = (url?: string, filter?: string) => {
    if (!url) return
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: { filter },
            })
            .then((request) => resolve(request.data))
            .catch(reject)
    })
}