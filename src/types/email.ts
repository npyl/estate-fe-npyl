import { gmail_v1 } from "@googleapis/gmail";

interface IEmailReq {}

type TEmailRes = Required<gmail_v1.Schema$Message>;

interface IEmailFilters {}

export type { IEmailReq, TEmailRes, IEmailFilters };
