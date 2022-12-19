import axios from 'axios'

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
                    .post(url, dataToSend)
                    .then((response) => resolve(response.data))
                    .catch(reject)
                break;
            case "DELETE":
                axios
                    .delete(url, { data: dataToSend })
                    .then((response) => resolve(response.data))
                    .catch(reject)
                break;
        }
    })
}