import { render } from '../render'

import type { Request, Response } from 'express'

export default async function defaultPage(req: Request, res: Response) {
  render(req, res)

  res.send()
}
