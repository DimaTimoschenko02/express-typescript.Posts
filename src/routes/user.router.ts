import { Router } from "express";
import { createUserHandler, getAllUsers } from "../controller/user.controller";
import { validateRequest } from '../middlware'
import { createUserSchema } from "../schema/user.schema";

const router = Router();

router.post("/user", validateRequest(createUserSchema), createUserHandler)
router.get("/user", getAllUsers)


export default router