import { B2BMemberReq } from "@/types/customer";

type B2BMemberReqYup = Partial<B2BMemberReq> & {
    firstName: string;
    lastName: string;
    email: string;
};

export type { B2BMemberReqYup };
