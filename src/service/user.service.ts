import User from "../model/user.model";
import IUserDocument from "../interfaces/user.interface";
import { DocumentDefinition } from "mongoose";

export async function createUser(user: DocumentDefinition<IUserDocument>):Promise<IUserDocument> {
  try {
    return await User.create(user);
  } catch (err) {
    throw err;
  }
}

export async function findUser(){
    return null
}
