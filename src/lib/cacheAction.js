import { SET_CACHE } from './cacheType'

export const setCache = (key, data) => (dispatch) => {
    dispatch({
        type: SET_CACHE,
        key,
        data
    })
}