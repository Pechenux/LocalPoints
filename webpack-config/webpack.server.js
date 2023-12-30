const path = require('path')
const fs = require('fs')

const envVariables = {}
require('dotenv').config({ processEnv: envVariables })
Object.keys(envVariables).forEach(
  key => (envVariables[key] = JSON.stringify(envVariables[key])),
)

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const TerserPlugin = require('terser-webpack-plugin')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  name: 'server',
  target: 'node',
  mode: isProduction ? 'production' : 'development',
  entry: resolveApp('src/server/index.ts'),
  output: {
    path: path.resolve('out'),
    filename: 'server.js',
  },
  externals: [nodeExternals()],
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
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: true } },
        ],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
        ],
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
        ...envVariables,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolveApp('src/static'),
          to: path.resolve('out', 'static'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_server.css',
      chunkFilename: '[id]_server.css',
    }),
  ].filter(Boolean),
  resolve: {
    modules: [resolveApp('src')],
    extensions: ['.*', '.js', '.jsx', '.ts', '.tsx', '.css'],
  },
}
