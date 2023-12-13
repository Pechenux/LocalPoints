const path = require('path')

const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

module.exports = {
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  externalsPresets: {
    node: true,
  },
  entry: {
    app: {
      import: path.join(__dirname, 'src', 'client', 'App'),
      filename: 'app.js',
    },
    client: {
      import: path.join(__dirname, 'src', 'client', 'index'),
      filename: 'js/client.js',
      dependOn: 'app',
    },
    server: {
      import: path.join(__dirname, 'src', 'server', 'index'),
      filename: 'server.js',
      dependOn: 'app',
    },
  },
  output: {
    path: path.resolve(__dirname, 'out'),
    publicPath: '/',
    chunkFilename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        WEBPACK: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'static'),
          to: path.resolve(__dirname, 'out', 'static'),
        },
      ],
    }),
  ],
  optimization: {
    minimize: false, //true,
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
      {
        test: /\.css$/i,
        use: [{ loader: 'css-loader', options: { modules: true } }],
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff(2))$/i,
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
