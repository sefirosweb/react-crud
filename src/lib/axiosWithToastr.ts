import { axiosInstance } from './axios'
import toastr from 'toastr';
import axios from 'axios';

toastr.options.preventDuplicates = true;
toastr.options.timeOut = 10000;
toastr.options.extendedTimeOut = 6000;
toastr.options.progressBar = true;


axiosInstance.interceptors.response.use(
  (response) => {
    const message = response.data?.message;
    if (message) {
      toastr.info(message);
    }

    return response;
  },
  (error) => {
    const statusCode =
      typeof error['response'] === 'undefined' ? '' : error.response.status;
    switch (statusCode) {
      case 400:
        toastr.error(
          error.response.data.error_description
            ? error.response.data.error_description
            : error.response.data.error,
          'Bad request'
        );
        break;
      case 401:
        toastr.warning('Please login again', 'Session time out!');
        break;
      case 403:
        toastr.error(`You don't have permissions for this site`, `Forbidden`);
        break;
      case 404:
        toastr.error(`Your request is not found in the website`, `Not found`);
        break;
      case 405:
        toastr.error(error.response.data, `Method not allowed`);
        break;
      case 422:
        const error_422 = `
                ${error.response.data.message}<br>
                ${Object.keys(error.response.data.errors).map((name) => {
          return error.response.data.errors[name].join('<br>');
        })}`;
        toastr.warning(error_422, `Unprocessable Entity`);
        break;

      default:
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          toastr.error(error, 'Other error found');
        }
    }
    return Promise.reject(error);
  }
);
