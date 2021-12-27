/* eslint-disable import/no-anonymous-default-export */
import { SET_CACHE } from './cacheType'

const INITIAL_STATE = {
    cache: {
        'asdsda': 5
    },
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_CACHE:

            const newCache = {
                ...state.cache,
            }

            newCache[action.key] = action.data;
            console.log('setting cache', newCache)

            return {
                ...state,
                cache: newCache
            }

        default: return state
    }
}