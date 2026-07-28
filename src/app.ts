import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { AuthRoutes } from "./modules/auth/auth.route";
import userRouter from "./modules/user/user.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { CategoryRoutes } from "./modules/category/category.route";
import { PropertyRoutes } from "./modules/property/property.route";
import { NewsRoutes } from "./modules/news/news.route";
import { PaymentRoutes } from "./modules/payment/payment.route";

const app = express();


// Stripe webhook MUST be before express.json()
app.use(
  "/api/v1/payment/webhook",
  express.raw({ type: "application/json" })
);


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RentNest Backend Running...",
  });
});


// Routes
app.use("/api/v1/auth", AuthRoutes);

app.use("/api/v1/users", userRouter);

app.use("/api/v1/categories", CategoryRoutes);

app.use("/api/v1/properties", PropertyRoutes);

app.use("/api/v1/news", NewsRoutes);

app.use("/api/v1/payment", PaymentRoutes);


// Error handler LAST
app.use(globalErrorHandler);


export default app;