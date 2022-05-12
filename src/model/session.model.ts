import mongoose from "mongoose";

import { IUserDocument } from './user.model'

export interface ISessionDocument extends mongoose.Document {
  user: IUserDocument["_id"]
  valid: boolean
  userAgent: string
  createdAt: Date
  updatedAt: Date
}



const SessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    valid: {
      type: Boolean,
      //default: false
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model<ISessionDocument>("Session", SessionSchema);
export default Session;
