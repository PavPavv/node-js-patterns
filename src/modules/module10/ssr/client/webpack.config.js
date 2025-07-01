const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const DEV_PORT = process.env.DEV_PORT || 3000;

module.exports = {
  entry: './src/main.js',

  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },

  mode: isDevelopment ? 'development' : 'production',


    plugins: [new HtmlWebpackPlugin({ title: 'ssr-test' })],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: DEV_PORT,
    hot: true,
    historyApiFallback: true,
  },
};