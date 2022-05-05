import express from "express";
import config from "config";
import connect from "./db/connect";
import router from "./routes/routes";
import { deserializeUser } from "./middlware";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();


app.use(deserializeUser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api' , router)

async function start(){
  try{
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
    await connect()
  }catch(err){
    throw err
  }
}

start()

