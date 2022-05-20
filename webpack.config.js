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
        test: /\.(png|jpg|gif)$/i,
        use: ['url-loader']
      }
      // {
      //   test: /\.json$/,
      //   use: []
      // }
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
    }),

    new AssetsPlugin({
      filename: 'assets.json',
      manifestFirst: true,
      prettyPrint: true,
      path: path.join(__dirname, 'src'),
      removeFullPathAutoPrefix: true,
      // includeAllFileTypes: false,
      // fileTypes: ['png', 'jpg', 'm4a'],
      includeFilesWithoutChunk: true,
      processOutput: assetOutput
    }),

    new CopyPlugin({
      patterns: [{ from: 'src/assets', to: './assets' }]
    })
  ]
}

function assetOutput(manifest) {
  const obj = manifest['']
  const allFilesArray = []
  const assets = { images: [], sounds: [] }

  for (const i in obj) {
    Array.isArray(obj[i]) ? allFilesArray.push(...obj[i]) : allFilesArray.push(obj[i])
  }

  allFilesArray.forEach((file) => {
    const type = file.split('.').at(-1)
    if (type === 'png' || type === 'jpg' || type === 'svg') assets.images.push(file)
    if (type === 'm4a') assets.sounds.push(file)
  })

  return JSON.stringify(assets)
}
