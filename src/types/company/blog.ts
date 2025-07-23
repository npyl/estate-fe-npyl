import { KeyValue } from "../KeyValue";
import { IUser, IUserMini } from "../user";
import { IPublicSitesRes } from "./company";

type TCategory = string;

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
    categories: TCategory[];
}

interface BlogPostRes extends BlogPostShort {
    content: string;
    user: IUser;
    categories: KeyValue<TCategory>[];
}

interface BlogFilters {
    search: string;
    sites: number[];
    published?: boolean;
    users: number[];
}

export type { TCategory, BlogPostShort, BlogPostReq, BlogPostRes, BlogFilters };
