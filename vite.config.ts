import { createRequire } from "module";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import dts from 'vite-plugin-dts'

function toCamelCase(text) {
    let words = text.split('-');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join('');
}

const getPeerDependencies = (): Record<string, string> => {
    const require = createRequire(import.meta.url);
    const data = require("./package.json");

    const peerDependencies = Object.keys(data.peerDependencies).reduce((acc, key) => {
        acc[key] = toCamelCase(key);
        return acc;
    }, {});

    return peerDependencies
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
                ...Object.keys(getPeerDependencies()),
            ],
            output: {
                globals: {
                    ...getPeerDependencies(),
                }
            },
        },
        sourcemap: false,
        emptyOutDir: true,
    },
    plugins: [react(), dts()],
})
