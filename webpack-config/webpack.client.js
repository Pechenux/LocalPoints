const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

module.exports = {
  name: 'client',
  mode: isProduction ? 'production' : 'development',
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
  entry: {
    client: [
      isProduction ? undefined : 'webpack-hot-middleware/client',
      resolveApp('src/client/index.tsx'),
    ].filter(Boolean),
  },
  target: 'web',
  output: {
    path: path.resolve(isProduction ? 'out' : 'dist'),
    publicPath: '/js/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin()],
    moduleIds: 'named',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {
          plugins: [
            isDevelopment && require.resolve('react-refresh/babel'),
          ].filter(Boolean),
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
        test: /\.(jpe?g|gif|png)$/i,
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
        filename: 'css/[name].css',
        chunkFilename: '[id].css',
      }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
  resolve: {
    modules: [resolveApp('src'), 'node_modules'],
    extensions: ['.*', '.js', '.jsx', '.ts', '.tsx', '.css'],
  },
}
