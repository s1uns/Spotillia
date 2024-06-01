import axios from "axios";
import { ICredentials, ISignInResult } from "../types/interfaces";

const url = process.env.VITE_ASPNETCORE_HTTPS_PORT
    ? process.env.VITE_ASPNETCORE_HTTPS_PORT
    : "http://localhost:5000/";



export const signIn = async (credentials: ICredentials) => {
    const { data } = await axios.post<ISignInResult>(
        `${url}auth/login`,
        credentials
    );

    return data;
};

export const signUp = async (credentials: ICredentials) => {
    const { data } = await axios.post<ISignInResult>(
        `${url}auth/register`,
        credentials
    );

    return data;
};
