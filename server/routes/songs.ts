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

router.get(
    "/liked-songs",
    asyncHandler(async (req: Request, res: Response) => {
        const db = getDb();
        const collection = db.collection<Song>("song");

        const songs = await collection
            .find({ userId: req.auth.id })
            .sort({ date: -1 })
            .toArray();
        res.status(200).json(songs);
    }),
);

router.get(
    "/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const db = getDb();
        const collection = db.collection<Song>("song");

        const song = await collection.findOne({
            _id: new ObjectId(req.params.id),
        });

        if (song === null) {
            res.status(404).send("Song not found");
            return;
        }

        res.status(200).json(song);
    }),
);

router.use(verifyAuth());
export default router;
