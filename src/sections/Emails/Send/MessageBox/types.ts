import { IEmailReq } from "@/types/email";

type TMessageBoxValues = Omit<IEmailReq, "attachments"> & {
    attachments: File[];
    toFreeSoloed: string[]; // customer emails that were freeSolo'ed
};

export type { TMessageBoxValues };
