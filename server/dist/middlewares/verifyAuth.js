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
const express_jwt_1 = require("express-jwt");
const db_1 = __importDefault(require("../db"));
const mongodb_1 = require("mongodb");
const injectUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, db_1.default)();
    const users = db.collection("user");
    if (req.auth.id) {
        req.auth.id = new mongodb_1.ObjectId(req.auth.id);
        req.user = yield users.findOne({
            _id: req.auth.id,
        });
        console.log("req.user", req.user, req.auth.id);
    }
    next();
});
exports.default = () => [
    (0, express_jwt_1.expressjwt)({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
    injectUser,
];
//# sourceMappingURL=verifyAuth.js.map