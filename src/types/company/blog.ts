import { DescriptionEntry } from "../description";
import { IPropertyFileMini } from "../file";
import { KeyValue } from "../KeyValue";
import { IUser, IUserMini } from "../user";
import { IPublicSitesRes } from "./company";

type TCategory = string;

interface BlogPostShort {
    id: number;
    url: string;
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
    images: IPropertyFileMini[];
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
