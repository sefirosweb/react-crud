import { axiosInstance as axios } from '../lib/axios'

type MutateData = {
    crud: "CREATE" | "DELETE",
    url: string,
    dataToSend: any
}

export const mutateData = (options: MutateData): Promise<any> => {
    const { crud, dataToSend, url } = options
    return new Promise((resolve, reject) => {
        switch (crud) {
            case "CREATE":
                axios
                    .post<{ success?: boolean }>(url, dataToSend)
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
                    .delete<{ success?: boolean }>(url, { data: dataToSend })
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

export const getInputDataField = (url: string, filter: Record<string, string>) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            resolve(null)
            return
        }

        axios
            .get(url, {
                params: filter,
            })
            .then((request) => resolve(request.data))
            .catch(reject)
    })
}
