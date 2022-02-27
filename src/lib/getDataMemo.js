import memoize from 'lodash.memoize'
import axios from 'axios'

const getDataMemo = (selectOptionsUrl, config) =>
    new Promise((resolve, reject) => {
        axios
            .get(selectOptionsUrl, config)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error))
    })

export default memoize(getDataMemo)
