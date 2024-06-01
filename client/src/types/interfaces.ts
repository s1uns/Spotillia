import { ChangeEvent, ReactNode } from "react";
import { ButtonType } from "./types";

export interface IHeaderProps {
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    currentPage: string;
    setCurrentPage: (currentPage: string) => void;
}

export interface IPageProps {
    isLogged: boolean;
    setCurrentPage: (currentPage: string) => void;
}

export interface IAuthProps {
    setIsLogged: (isLogged: boolean) => void;
    currentPage: string;
    setCurrentPage: (currentPage: string) => void;
}

export interface IButtonProps {
    children: ReactNode;
    handleClick?: () => void;
    customStyles?: string;
    type?: ButtonType;
    title: string;
    disabled?: boolean;
}

export interface ICredentials {
    email: string;
    password: string;
}

export interface ISignInResult {
    userId: string;
    userRole: string;
    bearer: string;
}



