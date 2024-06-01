import express from "express";

import verifyAuth from "../middlewares/verifyAuth";
import { Song } from "../db/types";
import getDb, { getBucket } from "../db";
import { Response } from "express";
import { Filter, ObjectId } from "mongodb";
import { Request } from "../types";
import asyncHandler from "express-async-handler";
const connectionString = process.env.ATLAS_URI || "";

const router = express.Router();

router.get(
    "/all-songs",
    asyncHandler(async (req: Request, res: Response) => {
        const db = getDb();
        console.log(db);
        const collection = db.collection<Song>("Song");

        const songs = await collection.find({}).toArray();
        res.status(200).json(songs);
    }),
);

router.use(verifyAuth());
export default router;
