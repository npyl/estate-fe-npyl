// -----------------------------------------------------------

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
    snippet: string;
    subject: string;
    date: string;
    initiator: string;
    messages: TThreadMessageRes[];
};

// Filter's paginated results
type TThreadShortRes = {
    id: string;
    snippet: string;
    subject: string;
    date: string;
    initiator: string;
};

interface IEmailFilters {
    search: string;
    from: string;
    to: string[];
    propertyIds: number[];
}

export type {
    TThreadMessageReq,
    // ...
    TThreadRes,
    TThreadShortRes,
    TThreadMessageRes,
    IThreadAttachmentRes,
    IThreadAttachmentReq,
    // ..
    IEmailFilters,
};

export * from "./mapper";
