import alias from 'rollup-plugin-alias'
import path from 'path'
import pkg from './package.json'
import tempDir from 'temp-dir'
import tsc from 'typescript'
import typescript from 'rollup-plugin-typescript2'

const extensions = ['.js', '.jsx']

export default [{
  input: 'src/web-penguins/index.ts',
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ],
  plugins: [
    alias({
      '@': path.resolve('js'),
      resolve: [
        ...extensions,
        ...extensions.map(ext => `/index${ext}`)
      ]
    }),
    typescript({
      typescript: tsc,
      cacheRoot: `${tempDir}/.rpt2_cache`
    })
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
}]
