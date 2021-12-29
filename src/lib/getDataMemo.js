import memoize from 'lodash.memoize'
import axios from 'axios'

const getDataMemo = (selectOptionsUrl, cancelTokenSource) =>
    new Promise((resolve, reject) => {
        axios
            .get(selectOptionsUrl, { cancelToken: cancelTokenSource.token })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error))
    })

export default memoize(getDataMemo)
