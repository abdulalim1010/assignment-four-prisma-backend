import express from "express";
import { PropertyController } from "./property.controller";

import { Role } from "@prisma/client";
import { auth } from "../../middleware/auth";


const router = express.Router();



router.post(
 "/",
 auth(Role.LANDLORD),
 PropertyController.createProperty
);



router.get(
 "/",
 PropertyController.getAllProperties
);



router.get(
 "/:id",
 PropertyController.getSingleProperty
);



export const PropertyRoutes = router;