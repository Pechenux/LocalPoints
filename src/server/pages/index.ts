import { Router } from 'express'

import defaultPage from './default'

const pages = Router()

pages.get('/', defaultPage)

export default pages
