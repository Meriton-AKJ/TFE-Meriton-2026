import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import { loginSchema, registerSchema } from '../validations/auth.validations.js'

const router = Router()

router.post('/register', validate({ body: registerSchema }), registerUser)
router.post('/login', validate({ body: loginSchema }), loginUser)
// router.post('/logout', logout)

export { router as authRouter }