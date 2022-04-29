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
    const user = this as IUserDocument
    if(user.isModified('password')){
        return next()
    }
    const hashPassword = await bcrypt.hashSync(user.password , 5)
    user.password = hashPassword
    return next()
})

UserSchema.methods.comparePassword = async function(candidatePassword: string){
    const user = this as IUserDocument
    return await bcrypt.compare(candidatePassword , user.password)

}
const User = mongoose.model<IUserDocument>('User' , UserSchema)
export default User
