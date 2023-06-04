import { terser } from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import cleaner from 'rollup-plugin-cleaner'

const name = 'XYEnum'

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/esm/index.js',
            format: 'esm',
        },
        {
            file: 'dist/esm/index.min.js',
            format: 'esm',
            plugins: [terser()],
        },
        {
            file: 'dist/index.js',
            format: 'umd',
            name,
        },
        {
            file: 'dist/index.min.js',
            format: 'umd',
            name,
            plugins: [terser()],
        },
    ],
    plugins: [
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
        }),
        cleaner({
            targets: ['dist'],
        }),
    ],
    watch: {
        include: 'src/**',
    },
}
