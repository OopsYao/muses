const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => ({
  mode: env.dev ? 'development' : 'production',
  output: {
    // This will be used by plugins like HtmlWebpackPlugin
    // Use the specific path rather than the relative one
    // to the current web path.
    // See https://stackoverflow.com/a/34628034
    publicPath: '/',
  },
  resolve: {
    extensions: ['...', '.md'],
  },
  devServer: {
    // SPA support
    historyApiFallback: true,
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
})
