import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import _ from 'lodash';

type StoreData = {
  [key: string]: {
    params: any;
    data: any;
  }[];
};

const store: StoreData = {};

const getCache = (url: string, params: any) => {
  const urlCached = store[url];
  if (!urlCached) return false;

  const found = urlCached.find((c) => _.isEqual(c.params, params));

  if (found) {
    return found.data;
  }

  return false;
};

const storeCache = (url: string, params: any, data: any) => {
  if (!store[url]) {
    store[url] = [];
  }
  store[url].push({
    params,
    data,
  });
};

export const axiosWithCache = {
  getUrlCache: (url: string, params?: Object | undefined) => {
    const param = params ?? {};
    return getCache(url, param);
  },

  get: (
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any>> => {
    const params = config?.params ?? {};
    return new Promise((resolve, reject) => {
      const cache = getCache(url, params);
      if (cache) {
        resolve(cache);
        return;
      }

      axios
        .get(url, config)
        .then((response) => {
          storeCache(url, params, response);
          resolve(response);
        })
        .catch(reject);
    });
  },

  post: (
    url: string,
    data?: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<AxiosResponse<any, any>> => {
    const params = data ?? {};
    return new Promise((resolve, reject) => {
      const cache = getCache(url, data);
      if (cache) {
        resolve(cache);
        return;
      }

      axios
        .post(url, data, config)
        .then((response) => {
          storeCache(url, params, response);
          resolve(response);
        })
        .catch(reject);
    });
  },

  deleteCache: (url: string) => {
    if (store[url]) {
      delete store[url];
    }
  },
};
