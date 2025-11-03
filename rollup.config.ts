import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { dts } from 'rollup-plugin-dts'
import multiEntry from '@rollup/plugin-multi-entry'
import pkg from './package.json'

export default [
  {
    input: ['src/index.ts', 'src/types/**/*.ts', '!**/*test*'],
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'esm', sourcemap: true },
    ],
    plugins: [
      nodeResolve({ preferBuiltins: true }),
      typescript({
        tsconfig: './tsconfig.json',
        noEmitOnError: true,
      }),
      multiEntry(),
    ],
    external: [...Object.keys(pkg.dependencies || {})],
  },
  {
    input: 'dist/types/public/**/*.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [nodeResolve({ preferBuiltins: true }), dts(), multiEntry()],
    external: [...Object.keys(pkg.dependencies || {})],
  },
]
