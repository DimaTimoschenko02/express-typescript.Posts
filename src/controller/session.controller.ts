import { Request, Response } from "express";
import { get } from 'lodash'
import { createSession, createAccessToken } from "../service/session.service";
import { sign } from '../utils/jwt.utils'
import { updateSession, ValidatePassword } from '../service/user.service'
import {getSessions} from '../service/session.service'
import Session from '../model/session.model'
import config from "config";

const timeToLive = config.get("refreshTokenTtl") as string;

export async function createSessionHandler(req: Request, res: Response) {
  const user = await ValidatePassword(req.body);

  if (!user) {
    return res.status(401).json({ message: "email or password" });
  }
  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = createAccessToken({ user, session });

  const refreshToken = sign(session, {
    expiresIn: timeToLive,
  });
  return res.json({ accessToken, refreshToken });
}

export async function destroySession(req: Request, res: Response) {
  //const sessionID = req.user.session
  const sessionId = get(req, "user.session")
  await updateSession(
    { _id: sessionId},
    { valid: false}
  )
  
  return res.status(200).json({message: "ok"})
}

export async function getUserSessions(req: Request , res: Response){
  // const userId = get(req, "user._id")
  // const sessions = await getSessions({userId})
  const sessions = await Session.find()
  return res.json({sessions})
}


