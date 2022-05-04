import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import IUserDocument from "../interfaces/user.interface";
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
      type:String,
      required:true,
  },
  name:{
      type:String,
      required:true
  }},
  {
      timestamps: true
  }
);
UserSchema.pre('save' , async function(next:mongoose.HookNextFunction){
    console.log('in save func')
    const user = this as IUserDocument
    if(!user.isModified('password')){
        return next()
    }
    const hashPassword = bcrypt.hashSync(user.password , 5)
    console.log('password' , hashPassword)
    user.password = hashPassword
    console.log('user' , user)    
    // await user.save()
    // console.log('user' , user)
    return next()
})

UserSchema.methods.comparePassword = async function(candidatePassword: string){
    const user = this as IUserDocument
    console.log(user)
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)

}
const User = mongoose.model<IUserDocument>('User' , UserSchema)
export default User
