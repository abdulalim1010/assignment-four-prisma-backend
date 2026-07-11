import express from "express";
import cors from "cors";

import { AuthRoutes } from "./modules/auth/auth.route";
import userRouter from "./modules/user/user.route";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RentNest Backend Running...",
  });
});

// Auth Routes
app.use("/api/v1/auth", AuthRoutes);

// User Routes
app.use("/api/v1/users", userRouter)
app.use(globalErrorHandler);

export default app;