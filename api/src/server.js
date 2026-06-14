import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import { roomsRouter } from "./routes/rooms.routes.js";
import { bookingsRouter } from "./routes/bookings.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/rooms", roomsRouter);
app.use("/bookings", bookingsRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
