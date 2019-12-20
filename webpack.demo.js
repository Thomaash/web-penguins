const config = require('./webpack.config.js')
const merge = require('webpack-merge')
const path = require('path')

const CopyPlugin = require('copy-webpack-plugin')

module.exports = merge.strategy({
  devServer: 'replace',
  devtool: 'replace',
  entry: 'replace',
  output: 'replace',
  plugins: 'merge'
})(config, {
  entry: {
    script: './demo/script'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'demo')
  },

  plugins: [
    new CopyPlugin([
      { from: 'demo/index.html', to: 'index.html' },
      { from: 'demo/style.css', to: 'style.css' },
      { from: 'assets', to: 'assets' }
    ])
  ],

  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'demo'),
    inline: true,
    port: 8080,
    writeToDisk: filePath => /\.(html|css)$/.test(filePath)
  }
})
