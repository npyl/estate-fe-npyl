import { KeyValue } from "@/types/KeyValue";
import { IDemand } from "@/types/demand";
import WithB2B from "./WithB2B";
import {
    FilterBase,
    RequestBase,
    ResponseBase,
    ResponseShortBase,
} from "./Base";

// ----------------------------------------------------------------------

interface B2BMemberReq {
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    mobilePhone: string;
    homePhone: string;
    fax: string;

    nationality: string;
    preferredLanguage: string;

    suggestedBy: string;
}

interface B2BMember {
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    mobilePhone: string;
    homePhone: string;
    fax: string;

    nationality: KeyValue;
    preferredLanguage: KeyValue;

    suggestedBy: string;
}

const B2BMember2Req = (m: B2BMember): B2BMemberReq => ({
    ...m,
    nationality: m.nationality.key,
    preferredLanguage: m.preferredLanguage.key,
});

// ----------------------------------------------------------

type ICustomerFilter = WithB2B<FilterBase>;

type ICustomer = WithB2B<ResponseBase> & { members: B2BMember[] };
type ICustomerResultResponse = WithB2B<ResponseShortBase>;
type ICustomerPOST = WithB2B<RequestBase> & { b2bMembers: B2BMemberReq[] };

interface ICustomerMini {
    id: number;
    firstName: string;
    lastName: string;
    email?: string;
}

interface ICustomerTabCounts {
    agreements: number;
    matchingProperties: number;
    ownedProperties: number;
    demands: number;
    tasks: number;
}

export type {
    ICustomer,
    ICustomerPOST,
    ICustomerResultResponse,
    ICustomerFilter,
    IDemand,
    ICustomerMini,
    ICustomerTabCounts,
    B2BMember,
    B2BMemberReq,
};

export { B2BMember2Req };
