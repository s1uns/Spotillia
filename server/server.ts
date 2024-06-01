import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
const cors = require('cors');

import { connectToServer } from "./db";
import authRouter from "./routes/auth";
import musicRouter from "./routes/songs";

const app = express();
app.use(cors());

const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/songs", musicRouter);

connectToServer().then(async () => {
    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
});
export { Request };
