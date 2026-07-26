import { Router } from 'express'
import { getUsers, updateUser, deleteUser } from '../controllers/users.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', auth(['ADMIN']), getUsers)
router.patch('/:id', auth(['ADMIN']), updateUser)
router.delete('/:id', auth(['ADMIN']), deleteUser)

export { router as usersRouter }
