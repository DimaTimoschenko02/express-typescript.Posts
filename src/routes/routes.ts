import { Response, Request, Router } from "express";
import { createUserHandler } from "../controller/user.controller";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ m: "ok" });
});
router.post("/user" , createUserHandler)

export default router