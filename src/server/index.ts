import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import {
  expressCspHeader,
  INLINE,
  NONE,
  SELF,
  DATA,
  BLOB,
} from 'express-csp-header'
import { Command } from 'commander'

import pages from './pages'
import { addDevMiddleware } from './middleware/dev-middleware'

const program = new Command()
program.option('-p, --port [value]', 'Startup port')
program.parse(process.argv)
const options = program.opts()

const app = express()
const port = options.port || 3000

app.use(morgan('tiny'))

const YMAP_SCRIPT = [
  'https://api-maps.yandex.ru',
  'https://suggest-maps.yandex.ru',
  'https://*.maps.yandex.net',
  'https://yandex.ru',
  'https://yastatic.net',
]

const YMAP_IMG = [
  'https://*.maps.yandex.net',
  'api-maps.yandex.ru',
  'https://yandex.ru',
]

const YMAP_FRAME = ['https://api-maps.yandex.ru']

const YMAP_CONNECT = [
  'https://api-maps.yandex.ru',
  'https://suggest-maps.yandex.ru',
  'https://*.maps.yandex.net',
  'https://yandex.ru',
  'https://*.taxi.yandex.net',
]

app.use(
  expressCspHeader({
    directives: {
      'default-src': [SELF],
      'script-src': [SELF, INLINE, ...YMAP_SCRIPT],
      'style-src': [SELF, INLINE, BLOB],
      'img-src': [SELF, DATA, ...YMAP_IMG],
      'frame-src': [SELF, ...YMAP_FRAME],
      'connect-src': [SELF, ...YMAP_CONNECT],
      'worker-src': [NONE],
      'block-all-mixed-content': true,
    },
  }),
)

app.use((_, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST',
  })
  next()
})

if (process.env.NODE_ENV === 'development') {
  addDevMiddleware(app)
} else {
  app.use(compression())
}

app.use(express.static('./out/static'))
app.use(express.static('./out'))

app.use(pages)

app.listen(port, () => {
  console.info(`Listening at http://localhost:${port}`)
})
