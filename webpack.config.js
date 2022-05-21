const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif||ttf|m4a)$/i,
        use: ['url-loader']
      }
    ]
  },

  devServer: {
    open: true,
    hot: true,
    compress: true,
    port: 9000,
    liveReload: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'match',
      template: path.resolve(__dirname, 'src/template.html'),
      filename: 'index.html'
    })
  ]
}
