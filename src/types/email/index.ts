interface IAttachment {
    base64: string;
    name: string;
    type: string;
}

interface TThreadMessageReq {
    to: string[];
    threadId?: string;

    subject: string;
    body: string;
    propertyIds: number[];
    attachments: IAttachment[];
}

type TThreadAttachment = {
    id: string;
    filename: string;
    size: string;
};

type TThreadMessageRes = {
    id: string;
    from: string;
    date: string;
    body: string;
    attachments: TThreadAttachment[];
};

type TThreadRes = {
    id: string;
    snippet: string;
    subject: string;
    date: string;
    initiator: string;
    messages: TThreadMessageRes[];
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
    TThreadMessageRes,
    TThreadAttachment,
    // ..
    IAttachment,
    IEmailFilters,
};

export * from "./mapper";
