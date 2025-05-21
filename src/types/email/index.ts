// -----------------------------------------------------------

import { gmail_v1 } from "@googleapis/gmail";

interface IThreadAttachmentReq {
    base64: string;
    name: string;
    type: string;
}

interface IThreadAttachmentRes {
    id: string;
    filename: string;
    size: string;
}

// -----------------------------------------------------------

interface TThreadMessageReq {
    to: string[];
    threadId?: string;

    subject: string;
    body: string;
    propertyIds: number[];
    attachments: IThreadAttachmentReq[];
}

type TThreadMessageRes = {
    id: string;
    from: string;
    date: string;
    body: string;
    attachments: IThreadAttachmentRes[];
};

// -----------------------------------------------------------

// Thread by id
type TThreadRes = {
    id: string;
    subject: string;
    initiator: string;
    messages: TThreadMessageRes[];
};

type TThreadMetadata = {
    subject: string;
    from: string;
    date: string;
    attachments: IThreadAttachmentRes[];
    initiator: string;
};

// Filter's paginated results; Each row looks like so:
//   [from]     [snippet]       [date]
//              [attachments]
type TThreadShortRes = {
    id: string;
    snippet: string;
} & TThreadMetadata;

// ----------------------------------------------------------------------------------

interface IEmailFilters {
    search: string;
    from: string;
    to: string[];
    propertyIds: number[];
}

type TEmailFilterRes = Omit<gmail_v1.Schema$ListThreadsResponse, "threads"> & {
    threads: TThreadShortRes[];
};

// ----------------------------------------------------------------------------------

export type {
    TThreadMessageReq,
    // ...
    TThreadRes,
    TThreadShortRes,
    TThreadMetadata,
    TThreadMessageRes,
    IThreadAttachmentRes,
    IThreadAttachmentReq,
    // ..
    IEmailFilters,
    TEmailFilterRes,
};

export * from "./mapper";
