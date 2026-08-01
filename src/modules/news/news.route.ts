import { Router } from "express";
import { NewsController } from "./news.controller";

import { Role } from "@prisma/client";
import { auth } from "../../middleware/auth";

const router = Router();

// Public Routes
router.get("/", NewsController.getAllNews);

router.get("/public", NewsController.getPublicNews);

router.get(
  "/premium",
  auth(Role.ADMIN, Role.LANDLORD, Role.TENANT),
  NewsController.getPremiumNews
);

router.get("/:id", NewsController.getSingleNews);

// Admin Only
router.post(
 "/",
 auth(Role.ADMIN),
 NewsController.createNews
);



router.patch(
 "/:id",
 auth(Role.ADMIN),
 NewsController.updateNews
);



//premium or not 
router.patch(
  "/:id/toggle-premium",
  auth(Role.ADMIN),
  NewsController.togglePremium
);

router.delete(
  "/:id",
  auth(Role.ADMIN),
  NewsController.deleteNews
);

export const NewsRoutes = router;