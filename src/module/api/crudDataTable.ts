import axios from 'axios'
import { CrudType, InputFilter, ModalDataToSend } from '../types'

export const getRequestData = (url?: string, params?: InputFilter) => {
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
                    .post(url, modalDataToSend)
                    .then((response) => resolve(response.data))
                    .catch(reject)
                break;
            case "DELETE":
                axios
                    .delete(url, { data: modalDataToSend })
                    .then((response) => resolve(response.data))
                    .catch(reject)
                break;
            case "UPDATE":
                axios
                    .put(url, modalDataToSend)
                    .then((response) => resolve(response.data))
                    .catch(reject)
                break;
        }
    })
}
