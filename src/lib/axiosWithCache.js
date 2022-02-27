import axios from 'axios'
import _ from 'lodash'

const store = {}

const getCache = (url, params) => {
    const urlCached = store[url]
    if (!urlCached) return false

    const found = urlCached.find((c) => _.isEqual(c.params, params))

    if (found) {
        return found.data
    }

    return false
}

const storeCache = (url, params, data) => {
    if (!store[url]) {
        store[url] = []
    }
    store[url].push({
        params,
        data,
    })
}

const axiosWithCache = {
    getUrlCache: (url, params) => {
        return getCache(url, params)
    },

    get: (url, config) => {
        const params = config.params ? config.params : {}
        return new Promise((resolve, reject) => {
            const cache = getCache(url, params)
            if (cache) {
                resolve(cache)
                return
            }

            axios
                .get(url, config)
                .then((response) => {
                    storeCache(url, params, response)
                    resolve(response)
                })
                .catch(reject)
        })
    },

    post: (url, data, config) => {
        const params = data ? data : {}
        return new Promise((resolve, reject) => {
            const cache = getCache(url, data)
            if (cache) {
                resolve(cache)
                return
            }

            axios
                .post(url, data, config)
                .then((response) => {
                    storeCache(url, params, response)
                    resolve(response)
                })
                .catch(reject)
        })
    },

    deleteCache: (url) => {
        if (store[url]) {
            delete store[url]
        }
    },
}

export default axiosWithCache
