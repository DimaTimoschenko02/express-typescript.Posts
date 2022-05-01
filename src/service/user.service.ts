import User from "../model/user.model";
import IUserDocument from "../interfaces/user.interface";
import { DocumentDefinition } from "mongoose";
import { omit } from 'lodash'
export async function createUser(
  user: DocumentDefinition<IUserDocument>
): Promise<IUserDocument> {
  try {
    return await User.create(user);
  } catch (err) {
    throw err;
  }
}

export async function findUser() {
  return null;
}

export async function ValidatePassword({
  email,
  password,
}: {
  email: IUserDocument["email"];
  password: string;
}) {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password)

  if(!isValid){
    return false
  }

  return omit(user.toJSON() , 'password')
}
