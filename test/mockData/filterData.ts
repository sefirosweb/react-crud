import { matchString } from "../../src/lib"

export const filterData = (row: any, params: Record<string, FilterType>) => {
    let result = true
    let globalFilter = true

    Object.entries(params).every(paramEntry => {
        const keyParam = paramEntry[0]
        const valueParam = paramEntry[1]

        if (keyParam === 'globalFilter' && typeof valueParam === "string") {
            if (matchGlobalFilter(row, valueParam)) {
                globalFilter = true
            } else {
                globalFilter = false
            }
            return true
        }

        if (typeof row[keyParam] === "undefined") {
            return true
        }

        if (
            (typeof valueParam === "string") &&
            !matchString(row[keyParam], valueParam)
        ) {
            result = false
            return false
        }

        if (
            (Array.isArray(valueParam) && !isNaN(valueParam[0]))
            && row[keyParam] < valueParam[0]
        ) {
            result = false
            return false
        }

        if (
            (Array.isArray(valueParam) && !isNaN(valueParam[1]))
            && row[keyParam] > valueParam[1]
        ) {
            result = false
            return false
        }

        return true
    })

    return globalFilter && result
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
