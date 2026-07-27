import express from "express";
import cors from "cors";

import { AuthRoutes } from "./modules/auth/auth.route";
import userRouter from "./modules/user/user.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { CategoryRoutes } from "./modules/category/category.route";
import { PropertyRoutes } from "./modules/property/property.route";
import { NewsRoutes } from "./modules/news/news.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {

  next();
});

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
app.use(
 "/api/v1/auth",
 AuthRoutes
);


app.use(
  "/api/v1/categories",
  CategoryRoutes
);


app.use(
 "/api/v1/properties",
 PropertyRoutes
);
app.use(
  "/api/v1/news",
  NewsRoutes
);


export default app;