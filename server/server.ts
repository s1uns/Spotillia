import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { connectToServer } from "./db";
import authRouter from "./routes/auth";
import musicRouter from "./routes/songs";

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

app.use("/auth", authRouter);
app.use("/songs", musicRouter);

// app.use((err: Error, req: Request, res: Response) => {
//     console.log(res)
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

//     res.status(statusCode).json({ message: err.message });
// });

connectToServer().then(async () => {
    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
});
export { Request };
