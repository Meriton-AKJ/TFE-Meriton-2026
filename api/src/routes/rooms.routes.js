import { Router } from 'express'
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } from '../controllers/rooms.controller.js'
import { auth } from '../middlewares/auth.middleware.js'
import { validate } from '../middlewares/validate.middleware.js'
import { idSchema, createRoomSchema, updateRoomSchema } from '../validations/room.validations.js'

const router = Router()

router
  .route('/')
  .get(getRooms)
  .post(auth(['ADMIN']), validate({ body: createRoomSchema }), createRoom)

router
  .route('/:id')
  .get(validate({ params: idSchema }), getRoomById)
  .patch(auth(['ADMIN']), validate({ params: idSchema, body: updateRoomSchema }), updateRoom)
  .delete(auth(['ADMIN']), validate({ params: idSchema }), deleteRoom)

export { router as roomsRouter }
