"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_gridfs_storage_1 = require("multer-gridfs-storage");
const storage = new multer_gridfs_storage_1.GridFsStorage({ url: process.env.ATLAS_URI });
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
//# sourceMappingURL=upload.js.map