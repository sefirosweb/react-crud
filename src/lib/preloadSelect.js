import axios from 'axios'
import getDataMemo from './getDataMemo'

const preloadSelect = (columns) => {
    columns.forEach((c) => {
        if (c.selectOptionsUrl && c.type === 'select') {
            const cancelTokenSource = axios.CancelToken.source()
            getDataMemo(c.selectOptionsUrl, {
                cancelToken: cancelTokenSource.token,
            }).catch((error) => console.log(error))
        }
    })

    columns.forEach((c) => {
        if (c.multiSelectOptionsUrl && c.type === 'multiselect') {
            const cancelTokenSource = axios.CancelToken.source()
            getDataMemo(`${c.multiSelectOptionsUrl}/get_array`, {
                cancelToken: cancelTokenSource.token,
            }).catch((error) => console.log(error))
        }
    })
}

export default preloadSelect
