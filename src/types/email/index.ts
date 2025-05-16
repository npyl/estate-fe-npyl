import { gmail_v1 } from "@googleapis/gmail";

interface IAttachment {
    base64: string;
    name: string;
    type: string;
}

interface IEmailReq {
    to: string[];
    subject: string;
    body: string;
    propertyIds: number[];
    attachments: IAttachment[];
}

type TEmailRes = Required<gmail_v1.Schema$Message>;

type TThreadAttachment = {
    id: string;
    filename: string;
    size: string;
};

type TThreadMessage = {
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
    messages: TThreadMessage[];
};

interface IEmailFilters {
    from: string;
    to: string[];
    propertyIds: number[];
}

export type {
    IEmailReq,
    TEmailRes,
    // ...
    TThreadRes,
    TThreadMessage,
    TThreadAttachment,
    // ..
    IAttachment,
    IEmailFilters,
};

export * from "./mapper";
