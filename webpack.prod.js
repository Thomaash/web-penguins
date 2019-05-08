const merge = require('webpack-merge')
const config = require('./webpack.config.js')

const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge.strategy({
  'mode': 'replace',
  'plugins': 'merge',
  'module.rules': 'replace',
  'devtool': 'replace'
})(config, {
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin()
  ],

  module: {
    rules: [{
      test: /\.(m?jsx?|m?tsx?)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.(png|jpg|gif)$/i,
      use: [{
        loader: 'url-loader'
      }]
    }]
  },

  devtool: 'source-map'
})
