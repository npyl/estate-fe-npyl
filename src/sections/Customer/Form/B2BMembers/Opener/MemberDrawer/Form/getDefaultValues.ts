import { B2BMemberReq } from "@/types/customer";
import { B2BMemberReqYup } from "./types";

const getEnumKey = (s?: string) => s || null;

const getDefaultValues = (m?: B2BMemberReq): B2BMemberReqYup => ({
    firstName: m?.firstName || "",
    lastName: m?.lastName || "",
    position: m?.position || "",
    email: m?.email || "",
    mobilePhone: m?.mobilePhone || "",
    homePhone: m?.homePhone || "",
    fax: m?.fax || "",

    nationality: getEnumKey(m?.nationality),
    preferredLanguage: getEnumKey(m?.preferredLanguage),

    suggestedBy: m?.suggestedBy || "",
});

export default getDefaultValues;
