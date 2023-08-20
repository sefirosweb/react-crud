import { Filters } from "@sefirosweb/react-multiple-search"
import { matchString } from "../../src/lib"

export const filterData = (row: any, params: Array<Filters>) => {
    return params.every(param => {
        const { filter, text } = param
        const valueParam = text
        const keyParam = filter
        const currentValue = row[keyParam]

        if (keyParam === 'globalFilter') {
            return matchGlobalFilter(row, valueParam)
        }

        if (typeof currentValue === "undefined") {
            return false
        }

        if (typeof valueParam === "string") {
            return matchString(currentValue, valueParam)
        }

        if (
            (Array.isArray(valueParam) && !isNaN(valueParam[0]))
            && currentValue < valueParam[0]
        ) {
            return false
        }

        if (
            (Array.isArray(valueParam) && !isNaN(valueParam[1]))
            && currentValue > valueParam[1]
        ) {
            return false
        }

        return true
    })
}


const matchGlobalFilter = (row: Record<string, string | number>, valueParam: string | number) => {
    if (valueParam === '') return true
    let result = false

    Object.entries(row).every((entry) => {
        if (matchString(entry[1], valueParam)) {
            result = true
            return false
        }
        return true
    })

    return result
}
