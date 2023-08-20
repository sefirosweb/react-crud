import { Filters } from '@sefirosweb/react-multiple-search'
import { axiosInstance as axios } from '../lib/axios'
import { CrudType, ModalDataToSend } from '../types'

export const getRequestData = (url?: string, params?: Array<Filters>) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            resolve(null)
            return
        }

        axios
            .get(url, {
                params,
            })
            .then((request) => resolve(request.data))
            .catch(reject)
    })
}

type MutateData = {
    crud: CrudType,
    url: string,
    modalDataToSend: ModalDataToSend
}

export const mutateData = (options: MutateData): Promise<any> => {
    const { crud, modalDataToSend, url } = options
    return new Promise((resolve, reject) => {
        switch (crud) {
            case "CREATE":
                axios
                    .post<{ success?: boolean }>(url, modalDataToSend)
                    .then((response) => {
                        if (response.data.success !== true) {
                            return reject(`The response dosen't response success`)
                        }
                        resolve(response.data)
                    })
                    .catch(reject)
                break;
            case "DELETE":
                axios
                    .delete<{ success?: boolean }>(url, { data: modalDataToSend })
                    .then((response) => {
                        if (response.data.success !== true) {
                            return reject(`The response dosen't response success`)
                        }
                        resolve(response.data)
                    })
                    .catch(reject)
                break;
            case "UPDATE":
                axios
                    .put<{ success?: boolean }>(url, modalDataToSend)
                    .then((response) => {
                        if (response.data.success !== true) {
                            return reject(`The response dosen't response success`)
                        }
                        resolve(response.data)
                    })
                    .catch(reject)
                break;
        }
    })
}
