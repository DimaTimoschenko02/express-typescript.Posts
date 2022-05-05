import { Router } from 'express';
import { createSessionHandler, destroySession } from '../controller/session.controller';
import { validateRequest, requireUser } from '../middlware'
import { createSessionSchema } from '../schema/session.schema';

const router = Router();



router.post("/session", validateRequest(createSessionSchema), createSessionHandler)
router.delete("/session", requireUser, destroySession)

export default router