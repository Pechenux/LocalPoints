import express from 'express'
import morgan from 'morgan'
import compression from 'compression'
import { expressCspHeader, INLINE, NONE, SELF } from 'express-csp-header'

import pages from './pages'
import { addDevMiddleware } from './middleware/dev-middleware'

const app = express()
const port = process.env.PORT || 3000

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

app.use((_, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST',
  })
  next()
})

app.use(pages)

const outputDir = process.env.NODE_ENV === 'development' ? 'dist' : 'out'
app.use(express.static(`./${outputDir}/static`))
app.use(express.static(`./${outputDir}`))

if (process.env.NODE_ENV === 'development') {
  addDevMiddleware(app)
} else {
  app.use(compression())
}

app.listen(port, () => {
  console.info(`Listening at http://localhost:${port}`)
})
