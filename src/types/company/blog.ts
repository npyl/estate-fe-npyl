import { DescriptionEntry } from "../description";
import { IPropertyFileMini } from "../file";
import { KeyValue } from "../KeyValue";
import { IUser, IUserMini } from "../user";
import { IPublicSitesRes } from "./company";

type TCategory = string;

/**
 * Read BlogPostReq for more info
 */
interface BlogPostShort {
    id: number;
    url: string; // thumbnail
    user: IUserMini;
    createdAt: string;
    updatedAt: string;
    viewCounter: number;
    sites: IPublicSitesRes[];
}

/**
 * images: all images of the blog, a.k.a.:
 *  - thumbnail (1)
 *  - images-inside (2)
 *
 * Currently (22/9/25), there are two endpoints for adding images to a blog post:
 *  - setThumbnail - corresponds to (1)
 *  - addImage - corresponds to (2)
 *
 * The FE, takes the batch of `images` and treats the first (index 0) as thumbnail, and the rest as the "images-inside".
 * (this is done using the useCreateOrUpdateBlogPostMutation)
 *
 * Now, please read BlogPostRes!
 */
interface BlogPostReq {
    id?: number;
    images: File[];
    descriptions: Record<string, DescriptionEntry>;
    publicSites: number[];
    categories: TCategory[];
}

/**
 * url: thumbnail (1)
 * images: again, this is everything; thumbnail(1) and images-inside (2) just like above!
 *
 * The SpringBoot BE sends only the (2), but on our next backend we also add (1) at the beggining
 */
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
