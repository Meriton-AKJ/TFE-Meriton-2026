import { Router } from "express";
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } from "../controllers/bookings.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import { idSchema, createBookingSchema, updateBookingSchema } from "../validations/booking.validations.js";

const router = Router();

router
    .route("/")
    .get(authMiddleware, isAdmin, getBookings)
    .post(authMiddleware, validate({ body: createBookingSchema }), createBooking);

router
    .route("/:id")
    .get(authMiddleware, validate({ params: idSchema }), getBookingById)
    .patch(authMiddleware, isAdmin, validate({ params: idSchema, body: updateBookingSchema }), updateBooking)
    .delete(authMiddleware, isAdmin, validate({ params: idSchema }), deleteBooking);

export { router as bookingsRouter };
