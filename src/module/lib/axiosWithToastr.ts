import axios from 'axios';
import toastr from 'toastr';

toastr.options.preventDuplicates = true;
toastr.options.timeOut = 10000;
toastr.options.extendedTimeOut = 6000;
toastr.options.progressBar = true;

export enum ValidFormatsToastTr {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

const checkValidToastTr = (messageStatus: any): ValidFormatsToastTr => {
  if (Object.values(ValidFormatsToastTr).includes(messageStatus))
    return messageStatus;
  return ValidFormatsToastTr.INFO;
};

const checkValidFiles = (files: any): Array<string> => {
  if (!Array.isArray(files)) return [];
  if (files.every((i) => typeof i === 'string')) {
    return files;
  }
  return [];
};

axios.interceptors.response.use(
  (response) => {
    const message = response.data?.message;
    const messageStatus = checkValidToastTr(response.data.messageStatus);
    const title = response.data?.title;
    if (message) {
      toastr[messageStatus](message, title);
    }

    const files = checkValidFiles(response.data.files);
    if (files) {
      files.forEach((f) =>
        // @ts-ignore: APP_URL is a global variable can't be not defined in APP
        window.open(APP_URL + '/general_helper/download_file/' + f)
      );
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
