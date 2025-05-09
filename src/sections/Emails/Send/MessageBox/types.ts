import { IEmailReq } from "@/types/email";

type TMessageBoxValues = IEmailReq & {
    toFreeSoloed: string[]; // customer emails that were freeSolo'ed
};

export type { TMessageBoxValues };
