import { string } from "yup";
import mongoose from "mongoose";
import config from "config";

const dbUri = config.get("dbUri") as string;
async function connect() {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connection is established");
  } catch (err) {
    console.log(err);
  }
}

export default connect;
