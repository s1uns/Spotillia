import { ObjectId } from "mongodb";

export interface User {
    email: string;
    password: string;
}

export interface Song {
    genreId: string;
    title: string;
    artist: string;
    duration: string;
    src: string;
    isLiked: boolean;
}

export type SongType = {
    id: string;
    title: string;
    genre: string;
    artist: string;
    duration: string;
    src: string;
    isLiked: boolean;
};

export interface Genre {
    title: string;
}

export interface Review {
    userId: ObjectId;
    songId: ObjectId;
    reviewText: string;
}

export interface Like {
    userId: ObjectId;
    songId: ObjectId;
}
