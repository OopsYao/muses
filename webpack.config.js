const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

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
    host: '0.0.0.0', // Accessible externally
  },
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /notes/,
        use: path.resolve(__dirname, 'src/star-loader.js'),
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'See ya',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
})
