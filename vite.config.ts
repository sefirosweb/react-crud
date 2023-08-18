import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import dts from 'vite-plugin-dts'
import fs from 'fs'

const readJson = () => {
    let rawdata = fs.readFileSync('student.json') as any;
    let student = JSON.parse(rawdata);
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
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    'styled-components': 'styled',
                },
            },
        },
        sourcemap: false,
        emptyOutDir: true,
    },
    plugins: [react(), dts()],
})
