import React from "react";
import getDataMemo from './getDataMemo';

const preloadSelect = (columns) => {

    columns.forEach(c => {
        if (c.selectOptionsUrl && c.type === 'select') {
            getDataMemo(c.selectOptionsUrl)
                .catch((error) => console.log(error))
        }
    })

};

export default preloadSelect;