import { Router } from 'express'
import { getUsers } from '../controllers/users.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', auth(['ADMIN']), getUsers)

export { router as usersRouter }
