import express from "express";
import asyncHandler from "express-async-handler";
import getDb from "../db";
import { Category } from "../db/types";
import { Response } from "express";
import { Filter, ObjectId } from "mongodb";
import { Request } from "../types";
const router = express.Router();
router.get(
    "/",
    asyncHandler(async (req: Request, res: Response) => {
        const db = getDb();
        const collection = db.collection<Category>("song");

        let filter: Filter<Category> = {};

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