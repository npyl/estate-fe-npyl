import { IEmailFilters } from "@/types/email";

type WithId<T> = T & { userId: number };

interface IEmailFilterReq {
    body: IEmailFilters;

    pageSize: number;
    pageToken?: string; // INFO: tell gmail api to fetch next page
}

interface IThreadReq {
    threadId: string;
}

export type { WithId, IThreadReq, IEmailFilterReq };
