import "../scss/app.scss"
// import '../src/lib/axiosWithToastr'
// import withAxiosDecorator from 'storybook-axios';
import { axiosInstance } from '../src/lib/axios';
import { startMock } from '../test/mockData'
import { Preview } from "@storybook/react";

const mock = startMock(axiosInstance)

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

// export const decorators = [withAxiosDecorator(axiosInstance)];

export default preview;

