const config = require('./webpack.config.js')
const merge = require('webpack-merge')
const path = require('path')

const CopyPlugin = require('copy-webpack-plugin')

module.exports = merge.strategy({
  devtool: 'replace',
  entry: 'replace',
  output: 'replace'
})(config, {
  entry: {
    'web-penguins': './web-penguins'
  },

  output: {
    filename: '[name].umd.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      root: 'webPenguins',
      amd: 'web-penguins',
      commonjs: 'web-penguins'
    },
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },

  plugins: [
    new CopyPlugin([
      { from: 'assets/penguins', to: 'assets' }
    ])
  ],

  devtool: 'source-map'
})
