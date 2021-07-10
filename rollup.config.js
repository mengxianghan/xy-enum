import resolve from 'rollup-plugin-node-resolve'
import {terser} from 'rollup-plugin-terser'
import babel from '@rollup/plugin-babel'
import clear from 'rollup-plugin-clear'

export default {
    input: 'src/Enum.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'esm'
        },
        {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'Enum'
        },
        {
            file: 'dist/index.umd.min.js',
            format: 'umd',
            name: 'Enum',
            plugins: [
                terser()
            ]
        }
    ],
    plugins: [
        resolve(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**'
        }),
        clear({
            targets: ['dist'],
            watch: true
        })
    ]
}
