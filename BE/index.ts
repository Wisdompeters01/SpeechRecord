import cors from "cors";
import express, { Application, Request, Response, json } from "express";
import { connect } from "mongoose";
import user from "./router/userRouter";

const app: Application = express();

const port: number = 4000;

app.use(cors());
app.use(json());

app.use("/", user);

app.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      msg: "Welcome to my API",
      status: 404,
    });
  } catch (error) {
    return res.status(404).json({
      msg: "Error",
      status: 404,
    });
  }
});

const URL = "mongodb+srv://abbeyrufai234:abbeyrufai234@cluster0.yokwex4.mongodb.net/speechDB?retryWrites=true&w=majority";

app.listen(port, async () => {
  await connect(URL).then(() => {
    console.log("DB connected");
  });
});
