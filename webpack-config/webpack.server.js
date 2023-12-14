const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

module.exports = {
  target: 'node',
  mode: isProduction ? 'production' : 'development',
  entry: resolveApp('src/server/index.js'),
  output: {
    path: path.resolve(isProduction ? 'out' : 'dist'),
    filename: 'server.js',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          isProduction && MiniCssExtractPlugin.loader,
          isDevelopment && 'style-loader',
          { loader: 'css-loader', options: { modules: true } },
        ].filter(Boolean),
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          isProduction && MiniCssExtractPlugin.loader,
          isDevelopment && 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
        ].filter(Boolean),
        include: /\.module\.css$/,
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
        WEBPACK: true,
      },
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: 'css/[name]_server.css',
        chunkFilename: '[id]_server.css',
      }),
  ],
  resolve: {
    extensions: ['.*', '.ts', '.tsx', '.css'],
  },
}
