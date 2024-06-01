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
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
const jwt = require('jsonwebtoken');
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.default)();
    const users = db.collection("user");
    const password = yield bcrypt_1.default.hash(req.body.password, 10);
    yield users.insertOne({
        email: req.body.email,
        password,
    });
    res.status(200).json({ message: "Registered successfully" });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.default)();
    const users = db.collection("user");
    const user = yield users.findOne({
        email: req.body.email,
    });
    const passwordValid = yield bcrypt_1.default.compare(req.body.password, user.password);
    if (user === null || !passwordValid) {
        return res.status(401).json({
            accessToken: null,
            message: "Email or password is incorrect",
        });
    }
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ accessToken });
}));
exports.default = router;
//# sourceMappingURL=auth.js.map