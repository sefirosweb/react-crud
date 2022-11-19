import "../scss/app.scss"
import '../src/module/lib/axiosWithToastr'
import "./dataMock"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
