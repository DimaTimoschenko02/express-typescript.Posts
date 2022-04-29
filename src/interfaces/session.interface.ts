import mongoose from 'mongoose'
import IUserDocument from './user.interface'

export default interface ISessionDocument extends mongoose.Document{
    user:IUserDocument["_id"]
    valid:string
    userAgent:boolean
    createdAt:Date
    updatedAt:Date
}