import path from 'path'

import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import webpack from 'webpack'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import {expressCspHeader, INLINE, NONE, SELF} from 'express-csp-header'

import pages from './pages'

const app = express()
const port = 3000

app.use(morgan('tiny'))

app.use(
  expressCspHeader({
    directives: {
      'default-src': [SELF],
      'script-src': [SELF, INLINE],
      'style-src': [SELF, INLINE],
      'img-src': [SELF, 'data:'],
      'worker-src': [NONE],
      'block-all-mixed-content': true,
    },
  }),
)

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST',
  })
  next()
})

if (process.env.NODE_ENV === 'development') {
  const config = require('../../webpack.client')
  const compiler = webpack(config)
  app.use(
    WebpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
      },
      writeToDisk: true
    }),
  )
  app.use(require('webpack-hot-middleware')(compiler))
  app.use(express.static(path.resolve(__dirname, 'static')))
} else if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'out')))
  app.use(compression())
}

app.use(pages)

app.listen(port, () => {
  console.info(`Listening at http://localhost:${port}`)
})
