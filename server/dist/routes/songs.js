"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyAuth_1 = __importDefault(require("../middlewares/verifyAuth"));
const db_1 = __importDefault(require("../db"));
const mongodb_1 = require("mongodb");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const router = express_1.default.Router();
router.get("/", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.default)();
    const collection = db.collection("song");
    let filter = {};
    if (typeof req.query.user === "string") {
        filter = { userId: new mongodb_1.ObjectId(req.query.user) };
    }
    const songs = yield collection
        .find(filter)
        .sort({ date: -1 })
        .toArray();
    res.status(200).json(songs);
})));
router.get("/me", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.default)();
    const collection = db.collection("song");
    const songs = yield collection
        .find({ userId: req.auth.id })
        .sort({ date: -1 })
        .toArray();
    res.status(200).json(songs);
})));
router.get("/:id", (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.default)();
    const collection = db.collection("song");
    const song = yield collection.findOne({
        _id: new mongodb_1.ObjectId(req.params.id),
    });
    if (song === null) {
        res.status(404).send("Song not found");
        return;
    }
    res.status(200).json(song);
})));
router.use((0, verifyAuth_1.default)());
//# sourceMappingURL=songs.js.map