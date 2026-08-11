import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { authRouter } from "./routes/auth.routes.js";
import { roomsRouter } from "./routes/rooms.routes.js";
import { bookingsRouter } from "./routes/bookings.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { statsRouter } from "./routes/stats.routes.js"
import { contactRouter } from "./routes/contact.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use("/auth", authLimiter);
app.use("/auth", authRouter);
app.use("/rooms", roomsRouter);
app.use("/bookings", bookingsRouter);
app.use("/users", usersRouter);
app.use("/stats", statsRouter)
app.use("/contact", contactRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
