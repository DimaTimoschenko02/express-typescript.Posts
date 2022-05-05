import { Router } from "express";
import userRouter from './user.router'
import postRouter from './post.router'
import sessionRouter from './session.router'
const router = Router();

router.use('/' , userRouter)
router.use('/' , postRouter)
router.use('/' , sessionRouter)
export default router


