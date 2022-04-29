import { Response, Request, Router } from "express";
import { createUserHandler } from "../controller/user.controller";
import validateRequest from '../middlware/validate'
import { createUserSchema } from "../schema/user.schema";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ m: "ok" });
});
router.post("/user" ,validateRequest(createUserSchema), createUserHandler)
//router.post("/user" ,validateRequest(createSessionSchema), createSessionHandler)

export default router