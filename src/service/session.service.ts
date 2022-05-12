import config from "config";
import { LeanDocument , FilterQuery } from "mongoose";
import { get } from "lodash";
import { IUserDocument } from "../model/user.model";
import Session , { ISessionDocument } from "../model/session.model";
import { decode , sign } from '../utils/jwt.utils'
import { findUser } from "./user.service";


export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export function createAccessToken({
  user,
  session,
}: {
  user:
    | Omit<IUserDocument, "password">
    | LeanDocument<Omit<IUserDocument, "password">>;
  session:
    | Omit<ISessionDocument, "password">
    | LeanDocument<Omit<ISessionDocument, "password">>;
}) {
  const timeToLive = config.get("accessTokenTtl") as string;
  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: timeToLive }
  );

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) : Promise<string | false>{
    const { decoded } = decode(refreshToken)
    if(!decode || !get(decoded , '_id')) return false
    
    const session = await Session.findById(get(decoded , "_id"))
    //|| !session.valid
    if(!session ) return false
    
    const user = await findUser({_id: session.user})

    if(!user) return false;
    
    const newAccesToken = await createAccessToken({user , session})
    return newAccesToken
}

export async function getSessions(query:FilterQuery<ISessionDocument>){
  return await Session.find(query).lean()
}
