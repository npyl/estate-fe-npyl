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
type TEmailRes = Required<gmail_v1.Schema$Message> & { from: string };

interface IEmailFilters {
    from: string;
    to: string[];
    propertyIds: number[];
}

export type { IEmailReq, TEmailRes, IAttachment, IEmailFilters };
