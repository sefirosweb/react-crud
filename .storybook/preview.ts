import "../scss/app.scss"
import '../react_components/src/lib/axiosWithToastr'
import withAxiosDecorator from 'storybook-axios';
import { axiosInstance } from '../react_components/src/lib/axios';
import mock from '../react_components/src/test/dataMock'
import { Preview } from "@storybook/react";

mock.startMock(axiosInstance)

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

//@ts-ignore
export const decorators = [withAxiosDecorator(axiosInstance)];

export default preview;

