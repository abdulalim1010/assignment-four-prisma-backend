import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";


const router = Router();


router.post("/", userController.createUser);

router.get("/", userController.getUsers);


// current logged in user
router.get(
  "/me",
  auth(),
  userController.getMe
);


export default router;