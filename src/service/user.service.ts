import User , { IUserDocument } from "../model/user.model";


import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";
import { omit } from 'lodash'
import Session , { ISessionDocument } from "../model/session.model";


export async function createUser(
  user: DocumentDefinition<IUserDocument>
): Promise<IUserDocument> {
  try {
    return await User.create(user);
  } catch (err) {
    throw err;
  }
}

export async function findUser(query: FilterQuery<IUserDocument> ) {
  return await User.findOne(query).lean()

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
    //console.log('nouser')
    return false;
  }

  const isValid = await user.comparePassword(password)

  if(!isValid){
    //console.log('invalid')
    return false
  }

  return omit(user.toJSON() , 'password')
}

export async function getUsers(){
  const users = await User.find()
  return users
}

export async function updateSession(
  query: FilterQuery<ISessionDocument> ,
  update: UpdateQuery<ISessionDocument>
  ){
    return await Session.updateOne(query , update)
  }