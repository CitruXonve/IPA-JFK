const webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./demo/index.jsx",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  mode: "development",
//   output: {
//     path: path.resolve(__dirname, "./dist"),
//     filename: "main.js",
//     libraryTarget: "commonjs2"
//   },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/dev.html'
    })
  ],
  devServer: {
  //   // contentBase: path.resolve(__dirname, "./dist"),
  //   contentBase: {
  //     http2: path.resolve(__dirname, "./dist")
  //   },
    hot: true,
  },
};