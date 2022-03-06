const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',

  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
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
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html'
    })
  ]
}
