import IUserDocument from "../interfaces/user.interface";
import Session from "../model/session.model";
import ISessionDocument from "../interfaces/session.interface";
import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";


export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}

export function createAccessToken({
    user,
    session,
}:{
    user:
        | Omit<IUserDocument , 'password'>
        | LeanDocument<Omit<IUserDocument , 'password'>>;
    session:
        | Omit<ISessionDocument , 'password'>
        | LeanDocument<Omit<IUserDocument , 'password'>>;

}){
    return null
}

