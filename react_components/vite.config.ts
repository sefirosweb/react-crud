import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import dts from 'vite-plugin-dts'

import { peerDependencies } from './package.json';

function externalPackages(deps: Record<string, string>) {
  return Object.keys(deps)
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@sefirosweb/react-crud',
      fileName: 'react-crud'
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@tanstack/react-query',
        ...externalPackages(peerDependencies),
      ],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDom',
          '@tanstack/react-query': 'TtanstackReactQuery',
          'react-bootstrap': 'TableBootstrap',
          'react-i18next': 'reactI18next',
          'quill': 'Quill',
          'axios': 'Axios',
          '@tanstack/react-table': 'reactTable',
          'i18next': 'i18n',
          'i18next-browser-languagedetector': 'LanguageDetector',
          'luxon': 'luxon',
          'toastr': 'toastr',
          'xlsx': 'xlsx',
          '@faker-js/faker': 'faker',
          'axios-mock-adapter': 'MockAdapter',
        },
      },
    },
    sourcemap: false,
    emptyOutDir: true,
  },
  plugins: [react(), dts(),
  ],
})
