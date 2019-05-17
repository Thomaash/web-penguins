const path = require('path')

const ROOT = path.resolve(__dirname, 'src')

module.exports = {
  context: ROOT,

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      ROOT,
      'node_modules'
    ],
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },

  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(ts|js)$/,
      use: 'source-map-loader'
    }, {
      enforce: 'pre',
      test: /\.(ts|js)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      }]
    }, {
      test: /\.ts$/,
      exclude: [/node_modules/],
      use: 'awesome-typescript-loader'
    }]
  },

  devtool: 'source-map'
}
