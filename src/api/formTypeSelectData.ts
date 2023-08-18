import { axiosInstance as axios } from '../lib/axios'
import { SelectOption } from '../types'

export const getFormTypeData = (url?: string) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            resolve(null)
            return
        }

        axios
            .get(url)
            .then((request) => resolve(request.data))
            .catch(reject)
    })
}

export const getInputDataField = (url?: string, filter?: string): Promise<Array<SelectOption>> => {
    return new Promise((resolve, reject) => {
        if (!url) {
            resolve([])
            return
        }

        axios
            .get<{ data: Array<SelectOption> }>(url, {
                params: { filter },
            })
            .then((request) => resolve(request.data.data))
            .catch(reject)
    })
}