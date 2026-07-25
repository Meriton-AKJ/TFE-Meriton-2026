import { Router } from 'express'
import { getBookings, getMyBookings, getBookingById, createBooking, updateBooking, deleteBooking } from '../controllers/bookings.controller.js'
import { auth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { idSchema, createBookingSchema, updateBookingSchema } from '../validations/booking.validations.js'

const router = Router()

router.get('/me', auth(), getMyBookings)

router
  .route('/')
  .get(auth(['ADMIN']), getBookings)
  .post(auth(), validate({ body: createBookingSchema }), createBooking)

router
  .route('/:id')
  .get(auth(), validate({ params: idSchema }), getBookingById)
  .patch(auth(['ADMIN']), validate({ params: idSchema, body: updateBookingSchema }), updateBooking)
  .delete(auth(['ADMIN']), validate({ params: idSchema }), deleteBooking)

export { router as bookingsRouter }
