import { DescriptionEntry } from "../description";
import { KeyValue } from "../KeyValue";
import { IUser, IUserMini } from "../user";
import { IPublicSitesRes } from "./company";

type TCategory = string;

interface BlogPostShort {
    id: number;
    user: IUserMini;
    createdAt: string;
    updatedAt: string;
    url: string;
    viewCounter: number;
    sites: IPublicSitesRes[];

    // TODO: title?
}

interface BlogPostReq {
    id?: number;
    descriptions: Record<string, DescriptionEntry>;
    publicSites: number[];
    categories: TCategory[];
}

interface BlogPostRes extends BlogPostShort {
    user: IUser;
    categories: KeyValue<TCategory>[];
    descriptions: Record<string, DescriptionEntry>;
}

interface BlogFilters {
    search: string;
    sites: number[];
    published?: boolean;
    users: number[];
    categories: number[];
}

export type { TCategory, BlogPostShort, BlogPostReq, BlogPostRes, BlogFilters };
