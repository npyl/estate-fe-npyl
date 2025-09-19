import { DescriptionEntry } from "../description";
import { KeyValue } from "../KeyValue";
import { IUser, IUserMini } from "../user";
import { IPublicSitesRes } from "./company";

type TCategory = string;

interface BlogPostShort {
    id: number;
    thumbnail: string; // url
    user: IUserMini;
    createdAt: string;
    updatedAt: string;
    viewCounter: number;
    sites: IPublicSitesRes[];
}

interface BlogPostReq {
    id?: number;
    images: File[];
    descriptions: Record<string, DescriptionEntry>;
    publicSites: number[];
    categories: TCategory[];
}

interface BlogPostRes extends BlogPostShort {
    user: IUser;
    images: string[]; // keys
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

interface IImageReq {
    contentType: string;
    filename: string;
    size: number;
}

export type {
    TCategory,
    BlogPostShort,
    BlogPostReq,
    BlogPostRes,
    BlogFilters,
    IImageReq,
};
