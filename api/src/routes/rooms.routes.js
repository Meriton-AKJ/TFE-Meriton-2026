import { Router } from "express";
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } from "../controllers/rooms.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import { idSchema, createRoomSchema, updateRoomSchema } from "../validations/room.validations.js";

const router = Router();

router
    .route("/")
    .get(getRooms)
    .post(authMiddleware, isAdmin, validate({ body: createRoomSchema }), createRoom);

router
    .route("/:id")
    .get(validate({ params: idSchema }), getRoomById)
    .patch(authMiddleware, isAdmin, validate({ params: idSchema, body: updateRoomSchema }), updateRoom)
    .delete(authMiddleware, isAdmin, validate({ params: idSchema }), deleteRoom);

export { router as roomsRouter };
