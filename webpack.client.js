const path = require('path')

const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction
const currentFolder = __dirname.split('/').at(-1)
const projectRoot = ['dist', 'out'].includes(currentFolder)
  ? path.join(__dirname, '..')
  : __dirname
const outputDir = path.join(projectRoot, isProduction ? 'out' : 'dist')

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    client: [
      isProduction ? undefined : 'webpack-hot-middleware/client',
      path.join(projectRoot, 'src', 'client', 'index'),
    ].filter(Boolean),
  },
  output: {
    path: outputDir,
    pathinfo: true,
    publicPath: '/',
    filename: 'js/client.js',
    chunkFilename: '[name].js',
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
        filename: 'css/bundle.css',
        chunkFilename: '[id].css',
      }),
    isProduction &&
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(projectRoot, 'src', 'client', 'assets'),
            to: path.resolve(outputDir, 'assets'),
          },
        ],
      }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin()],
    moduleIds: 'named',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        include: [path.resolve(projectRoot, 'src')],
        exclude: [path.resolve(projectRoot, 'node_modules')],
        loader: 'babel-loader',
        options: {
          plugins: [
            isDevelopment && require.resolve('react-refresh/babel'),
          ].filter(Boolean),
          presets: [
            [
              '@babel/env',
              {
                targets: {
                  browsers: 'last 2 chrome versions',
                },
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/i,
        use: [
          isProduction && MiniCssExtractPlugin.loader,
          isDevelopment && 'style-loader',
          { loader: 'css-loader', options: { modules: true }},
        ].filter(Boolean),
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
      // todo: add font loader
    ],
  },
  resolve: {
    alias: { './': path.join(projectRoot) },
    extensions: ['.*', '.js', '.jsx', '.tsx', '.ts'],
  },
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
}
