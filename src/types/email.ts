import { gmail_v1 } from "@googleapis/gmail";

interface IEmailReq {
    to: string[];
    subject: string;
    body: string;
    propertyIds: number[];
}
type TEmailRes = Required<gmail_v1.Schema$Message> & { from: string };

interface IEmailFilters {
    from: string;
    to: string[];
    propertyIds: number[];
}

export type { IEmailReq, TEmailRes, IEmailFilters };
