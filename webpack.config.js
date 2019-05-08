const path = require('path')
const webpack = require('webpack')

const CopyPlugin = require('copy-webpack-plugin')

const ROOT = path.resolve(__dirname, 'src')
const DESTINATION = path.resolve(__dirname, 'dist')

module.exports = {
  context: ROOT,

  entry: {
    'WebPenguins': './WebPenguins',
    'WebPenguins.globals': './WebPenguins/globals',
    'WebPenguins.demo': './demo/demo'
  },

  output: {
    filename: '[name].js',
    path: DESTINATION
  },

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

  plugins: [
    new CopyPlugin([
      { from: 'demo/demo.html', to: 'index.html' },
      { from: 'demo/demo.css', to: 'demo.css' },
      { from: 'assets', to: 'assets' }
    ])
  ],

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
      exclude: [ /node_modules/ ],
      use: 'awesome-typescript-loader'
    }, {
      test: /\.(png|jpg|gif)$/i,
      use: [{
        loader: 'url-loader'
      }]
    }]
  },

  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    inline: true,
    port: 8080,
    writeToDisk: filePath => /\.(html|css)$/.test(filePath)
  }
}
