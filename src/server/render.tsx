import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'

import App from '../client/App'

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

  const html = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>,
  )
  res.write(`<div id="root">${html}</div>`)

  res.write('</script></body>')
}
