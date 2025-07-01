import { IUser, IUserMini } from "../user";
import { IPublicSitesRes } from "./company";

interface BlogPostShort {
    id: number;
    title: string;
    user: IUserMini;
    createdAt: string;
    updatedAt: string;
    url: string;
    viewCounter: number;
    sites: IPublicSitesRes[];
}

interface BlogPostReq {
    id?: number;
    title: string;
    content: string;
    publicSites: number[];
}

interface BlogPostRes extends BlogPostShort {
    content: string;
    user: IUser;
}

interface BlogFilters {
    search: string;
    sites: number[];
    published?: boolean;
    users: number[];
}

export type { BlogPostShort, BlogPostReq, BlogPostRes, BlogFilters };
