import { createSessionSchema } from './../schema/session.schema';
import { Response, Request, Router } from "express";
import { createUserHandler , getAllUsers } from "../controller/user.controller";
import validateRequest from '../middlware/validate'
import { createUserSchema } from "../schema/user.schema";
import { createSessionHandler , logout } from '../controller/session.controller';
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ m: "ok" });
});
router.post("/user" ,validateRequest(createUserSchema), createUserHandler)
router.get("/user" , getAllUsers)
router.post("/session" ,validateRequest(createSessionSchema), createSessionHandler)
router.delete("/session",  logout)
export default router


