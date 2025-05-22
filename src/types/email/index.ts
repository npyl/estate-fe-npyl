// -----------------------------------------------------------

import { gmail_v1 } from "@googleapis/gmail";

// Upload attachment
interface IThreadAttachmentReq {
    base64: string;
    name: string;
    mimeType: string;
}

type IThreadAttachmentRes = { base64: string };

interface IThreadAttachmentShortRes {
    id: string;
    messageId: string; // message it belongs to
    filename: string;
    mimeType: string;
    size: string;
}

// -----------------------------------------------------------

interface IGetAttachmentsReq {
    messageId: string;
    attachmentIds: string[];
}
interface IGetAttachmentReq {
    messageId: string;
    attachmentId: string;
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
    attachments: IThreadAttachmentShortRes[];
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
    attachments: IThreadAttachmentShortRes[];
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
    IGetAttachmentReq,
    IGetAttachmentsReq,
    // ...
    TThreadRes,
    TThreadShortRes,
    TThreadMetadata,
    TThreadMessageRes,
    IThreadAttachmentReq,
    IThreadAttachmentShortRes,
    IThreadAttachmentRes,
    // ..
    IEmailFilters,
    TEmailFilterRes,
};

export * from "./mapper";
