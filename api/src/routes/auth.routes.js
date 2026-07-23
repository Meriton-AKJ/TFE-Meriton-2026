import { Router } from 'express'
import { registerUser, loginUser, getProfile } from '../controllers/auth.controller.js'
import { auth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { registerSchema, loginSchema } from '../validations/auth.validations.js'

const router = Router()

router.post('/register', validate({ body: registerSchema }), registerUser)
router.post('/login', validate({ body: loginSchema }), loginUser)
router.get('/profile', auth(), getProfile)

export { router as authRouter }
