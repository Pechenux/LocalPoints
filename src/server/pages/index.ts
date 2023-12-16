import { Router } from 'express'

import defaultPage from './default'

const pages = Router()

pages.get('/', defaultPage)
pages.get('/test', defaultPage)

export default pages
