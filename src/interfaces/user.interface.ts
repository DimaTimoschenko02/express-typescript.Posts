import mongoose from 'mongoose'

export default interface IUserDocument extends mongoose.Document{
    email:string
    password:string
    name:string
    createdAt:Date
    updatedAt:Date
    comparePassword(candidatePassword: string): Promise<boolean>
}