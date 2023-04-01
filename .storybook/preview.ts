import "../scss/app.scss"
import '../react_components/src/lib/axiosWithToastr'
import withAxiosDecorator from 'storybook-axios';
import { axiosInstance } from '../react_components/src/lib/axios';
import mock from '../react_components/src/test/dataMock'

mock.startMock(axiosInstance)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

//@ts-ignore
export const decorators = [withAxiosDecorator(axiosInstance)];
