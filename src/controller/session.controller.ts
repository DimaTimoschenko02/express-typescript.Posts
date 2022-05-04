import { ValidatePassword } from "../service/user.service";
import { createAccessToken } from "../service/session.service";
import { Request, Response } from "express";
import { createSession } from "../service/session.service";
import { sign } from '../utils/jwt.utils'
import config from "config";

const timeToLive = config.get("refreshTokenTtl") as string;

export async function createSessionHandler(req: Request, res: Response) {
  const user = await ValidatePassword(req.body);

  if (!user) {
    return res.status(401).json({ message: "email or password" });
  }
  const session = await createSession(user._id, req.get("user-agent") || "");

  const accessToken = createAccessToken({ user, session });
  
  const refreshToken = sign(session,{
    expiresIn: timeToLive,
  });
  return res.json({ accessToken, refreshToken });
}

export async function destroySession(req:Request , res: Response) {
  
}

export async function logout(){
  
}
