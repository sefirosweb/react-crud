import axios from "axios";
import "../scss/app.scss"
import '../src/module/lib/axiosWithToastr'
import withAxiosDecorator from 'storybook-axios';
import './dataMock';

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
export const decorators = [withAxiosDecorator(axios)];
