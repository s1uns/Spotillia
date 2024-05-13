import express from "express";
import verifyAuth from "../middlewares/verifyAuth";
import { Song } from "../db/types";
import upload from "../upload";
import getDb, { getBucket } from "../db";
import { Response } from "express";
import { Filter, ObjectId } from "mongodb";
import { Request } from "../types";
import asyncHandler from "express-async-handler";

const router = express.Router();
router.post(
    "/",
    upload.single("song"),
    asyncHandler(async (req: Request, res: Response) => {
        const db = getDb();
        const collection = db.collection<Song>("song");
        if (!req.file?.filename) {
            res.status(400).send("File not uploaded");
            return;
        }

        const result = await collection.insertOne({
            userId: req.auth.id,
            categoryId: req.body.categoryId,
            filename: req.file.filename,
            mimeType: req.file.mimetype,
            title: req.body.title,
            duration: req.body.duration,
            genre: req.body.genre,
            lyrics: req.body.lyrics,
            uploaded: new Date(),
        });

        res.status(200).json(result);
    })
);

router.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const db = getDb();
        const collection = db.collection<Song>("song");

        let filter: Filter<Song> = {};

        if (typeof req.query.user === "string") {
            filter = { userId: new ObjectId(req.query.user) };
        }

        const songs = await collection
            .find(filter)
            .sort({ date: -1 })
            .toArray();
        res.status(200).json(songs);
    })
);

router.get(
    "/me",
    asyncHandler(async (req: Request, res: Response) => {
        const db = getDb();
        const collection = db.collection<Song>("song");

        const songs = await collection
            .find({ userId: req.auth.id })
            .sort({ date: -1 })
            .toArray();
        res.status(200).json(songs);
    })
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
    })
);

router.get(
    "/:id/stream",
    asyncHandler(async (req, res) => {
        const bucket = getBucket();
        const db = getDb();
        const collection = db.collection<Song>("song");

        const song = await collection.findOne({
            _id: new ObjectId(req.params.id),
        });

        if (song === null) {
            res.status(404).send("Song not found");
            return;
        }

        res.status(200);

        res.set({
            "Content-Type": song.mimeType,
            "Transfer-Encoding": "chunked",
        });

        bucket.openDownloadStreamByName(song.filename).pipe(res);
    })
);

router.put(
    "/:id",
    upload.single("song"),
    asyncHandler(async (req: Request, res: Response) => {
        const db = getDb();
        const collection = db.collection<Song>("song");

        await collection.updateOne(
            { userId: req.auth.id, _id: req.body.id },
            {
                $set: {
                    filename: req.file?.filename,
                    title: req.body.title,
                    duration: req.body.duration,
                    genre: req.body.genre,
                    lyrics: req.body.lyrics,
                },
            }
        );
        res.status(200).json("Updated successfully");
    })
);

router.delete(
    "/:id",
    asyncHandler(async (req: Request, res: Response) => {
        const db = getDb();
        const collection = db.collection<Song>("song");

        await collection.deleteOne({ userId: req.auth.id, _id: req.body.id });
        res.status(200).json("Deleted successfully");
    })
);

router.use(verifyAuth());
