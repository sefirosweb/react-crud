import React from "react";
import axios from "axios";
import getDataMemo from './getDataMemo';

const preloadSelect = (columns) => {
    console.log({ columns })

    columns.forEach(c => {
        if (c.selectOptionsUrl && c.type === 'select') {
            const cancelTokenSource = axios.CancelToken.source();
            getDataMemo(c.selectOptionsUrl, cancelTokenSource)
                .catch((error) => console.log(error))
        }
    })

    columns.forEach(c => {
        if (c.multiSelectOptionsUrl && c.type === 'multiselect') {
            const cancelTokenSource = axios.CancelToken.source();
            getDataMemo(`${c.multiSelectOptionsUrl}/get_array`, cancelTokenSource)
                .catch((error) => console.log(error))
        }
    })

};

export default preloadSelect;