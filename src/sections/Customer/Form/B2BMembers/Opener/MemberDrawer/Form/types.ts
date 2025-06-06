import { B2BMemberReq } from "@/types/customer";

type OmitList = "nationality" | "preferredLanguage";

type B2BMemberReqYup = Partial<Omit<B2BMemberReq, OmitList>> & {
    firstName: string;
    lastName: string;
    email: string;

    nationality: string | null;
    preferredLanguage: string | null;
};

export type { B2BMemberReqYup };
