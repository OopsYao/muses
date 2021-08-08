const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['...', '.md'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /notes\/.*/,
        use: path.resolve(__dirname, 'src/star-loader.js'),
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'See ya',
      template: path.resolve(__dirname, 'src/index.html'),
    })
  ],
}
