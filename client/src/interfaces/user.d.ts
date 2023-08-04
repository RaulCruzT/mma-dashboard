export interface IFile {
    name: string;
    percent: number;
    size: number;
    status: "error" | "success" | "done" | "uploading" | "removed";
    type: string;
    uid: string;
    url: string;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    avatar: IFile[];
    role: string;
}