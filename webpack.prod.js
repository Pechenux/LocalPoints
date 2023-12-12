const path = require('path')

const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const nodeExternals = require('webpack-node-externals')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction
const resultDir = path.join(__dirname, isProduction ? 'out' : 'dist')

const commonConfig = {
  mode: isProduction ? 'production' : 'development',
  target: 'web',
  externals: [nodeExternals()],
  externalsPresets: {
    node: true,
  },
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 2000,
    ignored: /node_modules/,
  },
  entry: {
    // server: [path.join(__dirname, 'src', 'server', 'index')],
    client: [
      isProduction ? undefined : 'webpack-hot-middleware/client',
      path.join(__dirname, 'src', 'client', 'index'),
    ].filter(Boolean),
  },
  output: {
    path: resultDir,
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
        WEBPACK: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'client', 'assets'),
          to: path.resolve(resultDir, 'assets'),
        },
      ],
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [new TerserPlugin()],
    moduleIds: 'named',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        include: [path.resolve(__dirname, 'src', 'client', 'index')],
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
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
          'css-loader',
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
    extensions: ['.*', '.js', '.jsx', '.tsx', '.ts'],
  },
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
}

module.exports = commonConfig
