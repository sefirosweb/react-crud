import axios from 'axios'
import axiosWithCache from './axiosWithCache'

const preloadSelect = (columns) => {
    columns.forEach((c) => {
        if (c.selectOptionsUrl && c.type === 'select') {
            const cancelTokenSource = axios.CancelToken.source()
            axiosWithCache.get(c.selectOptionsUrl, {
                cancelToken: cancelTokenSource.token,
            })
        }
    })

    columns.forEach((c) => {
        if (c.multiSelectOptionsUrl && c.type === 'multiselect') {
            const cancelTokenSource = axios.CancelToken.source()
            axiosWithCache.get(`${c.multiSelectOptionsUrl}/get_array`, {
                cancelToken: cancelTokenSource.token,
            })
        }
    })
}

export default preloadSelect
