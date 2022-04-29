import express from "express";
import config from "config";
import connect from "./db/connect";
import router from "./routes/routes";
const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api' , router)
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
		connect()
});
