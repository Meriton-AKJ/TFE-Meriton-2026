import { Router } from 'express'
import { getStats } from '../controllers/stats.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', auth(['ADMIN']), getStats)

export { router as statsRouter }
