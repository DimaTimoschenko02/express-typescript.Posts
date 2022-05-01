import mongoose from "mongoose";


import ISessionDocument from "../interfaces/session.interface";

const SessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    valid: {
      type: Boolean,
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
