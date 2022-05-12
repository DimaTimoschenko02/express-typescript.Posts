import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUserDocument extends mongoose.Document {
    email: string
    password: string
    name: string
    createdAt: Date
    updatedAt: Date
    comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);
UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    const user = this as IUserDocument
    if (!user.isModified('password')) {
        return next()
    }
    const hashPassword = bcrypt.hashSync(user.password, 5)

    user.password = hashPassword

    return next()
})

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as IUserDocument
    //console.log(user)
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)

}
const User = mongoose.model<IUserDocument>('User', UserSchema)
export default User
