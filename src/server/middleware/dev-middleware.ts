import type { Express } from 'express'

export function addDevMiddleware(app: Express) {
  const webpack = require('webpack')
  const devMiddleware = require('webpack-dev-middleware')
  const hotReloadMiddleware = require('webpack-hot-middleware')

  const clientConfig = require('../../../webpack-config/webpack.client.js')
  const serverConfig = require('../../../webpack-config/webpack.server.js')
  const compiler = webpack([clientConfig, serverConfig])

  app.use(
    devMiddleware(compiler, {
      publicPath: clientConfig.output.publicPath,
      serverSideRender: true,
      stats: 'errors-only',
      writeToDisk: false,
    }),
  )

  const clientCompiler = compiler.compilers.find(
    (c: { name: string }) => c.name === 'client',
  )
  app.use(
    hotReloadMiddleware(clientCompiler, {
      reload: true,
      path: '/__webpack_hmr',
      heartbeat: 4000,
    }),
  )
}
