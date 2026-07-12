import express from "express";
import { CategoryController } from "./category.controller";


export const router = express.Router();


router.post(
  "/",
  CategoryController.createCategory
);


router.get(
  "/",
  CategoryController.getAllCategories
);


router.get(
  "/:id",
  CategoryController.getSingleCategory
);


router.delete(
  "/:id",
  CategoryController.deleteCategory
);


export const CategoryRoutes = router;