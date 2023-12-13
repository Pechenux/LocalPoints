import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { FC, Fragment } from 'react'

let App: FC = Fragment
if (process.env.NODE_ENV === 'production') {
  App = require('../client/App').default
}
// import App from '../client/App'

import Head from './components/Head'

import type { Request, Response } from 'express'

export function render(req: Request, res: Response) {
  res.setHeader('Content-Type', 'text/html')
  res.write('<!doctype html><html>')
  renderHead(res)
  renderBody(req, res)
  res.write('</html>')
}

function renderHead(res: Response) {
  res.write(renderToString(<Head />))
}

function renderBody(req: Request, res: Response) {
  res.write(
    '<body><noscript>You need to enable JavaScript to run this app.</noscript>',
  )

  if (process.env.NODE_ENV === 'production') {
    const html = renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>,
    )
    res.write(`<div id="root">${html}</div>`)
  } else {
    res.write(`<div id="root"></div>`)
  }

  res.write('</script></body>')
}
