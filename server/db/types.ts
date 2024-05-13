import { ObjectId } from "mongodb";

export interface User {
    email: string;
    password: string;
    username: string;
}

export interface Song {
    userId: ObjectId;
    categoryId: ObjectId;
    filename: string;
    mimeType: string;
    title: string;
    genre?: string;
    release?: Date;
    duration: number;
    lyrics?: string;
    uploaded: Date;
}

export interface Category {
    categoryName: string;
}

export interface Review {
    userId: ObjectId;
    songId: ObjectId;
    reviewText: string;
}
