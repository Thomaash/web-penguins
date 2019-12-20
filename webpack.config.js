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
      test: /\.m?[tj]sx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      }]
    }, {
      test: /\.m?[tj]sx?$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'babel-loader'
      }, {
        loader: 'ts-loader'
      }]
    }]
  },

  devtool: 'source-map'
}
