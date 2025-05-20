import { TThreadMessageReq } from "@/types/email";

type TMessageBoxValues = Omit<TThreadMessageReq, "attachments"> & {
    attachments: File[];
    toFreeSoloed: string[]; // customer emails that were freeSolo'ed
};

export type { TMessageBoxValues };
