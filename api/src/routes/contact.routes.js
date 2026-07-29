import { Router } from 'express'
import { createContact, getContacts, markAsRead } from '../controllers/contact.controller.js'
import { auth } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/', createContact)
router.get('/', auth(['ADMIN']), getContacts)
router.patch('/:id/read', auth(['ADMIN']), markAsRead)

export { router as contactRouter }
