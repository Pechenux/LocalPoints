const path = require('path')

const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction
const outputDir = path.join(__dirname, isProduction ? 'out' : 'dist')

module.exports = {
  mode: isProduction ? 'production' : 'development',
  target: 'node',
  externals: [nodeExternals()],
  externalsPresets: {
    node: true,
  },
  entry: {
    server: [path.join(__dirname, 'src', 'server', 'index')],
  },
  output: {
    path: outputDir,
    publicPath: '/',
    filename: 'server.js',
    chunkFilename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
        WEBPACK: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'static'),
          to: path.resolve(outputDir, 'static'),
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    moduleIds: 'named',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        include: [path.resolve(__dirname, 'src')],
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
      isProduction && {
        test: /\.css$/i,
        use: [{ loader: 'css-loader', options: { modules: true } }],
      },
      isProduction && {
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
    ].filter(Boolean),
  },
  resolve: {
    extensions: ['.*', '.tsx', '.ts'],
  },
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
}
