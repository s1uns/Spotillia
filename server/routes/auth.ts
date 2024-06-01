import express from "express";
import getDb from "../db";
import { User } from "../db/types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/register", async (req, res) => {
    const db = getDb();
    const users = db.collection<User>("user");

    const password = await bcrypt.hash(req.body.password, 10);

    const newUser = {
        email: req.body.email,
        password,
    };

    const result = await users.insertOne(newUser);

    const bearer = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.status(200).json({ message: "Registered successfully", bearer });
});

router.post("/login", async (req, res) => {
    const db = getDb();
    const users = db.collection<User>("user");

    const user = await users.findOne({
        email: req.body.email,
    });

    if (user === null) {
        return res.status(401).json({
            bearer: null,
            message: "Email or password is incorrect",
        });
    }

    const passwordValid = await bcrypt.compare(
        req.body.password,
        user.password,
    );

    if (!passwordValid) {
        return res.status(401).json({
            bearer: null,
            message: "Email or password is incorrect",
        });
    }

    const bearer = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.status(200).json({ bearer });
});

export default router;
