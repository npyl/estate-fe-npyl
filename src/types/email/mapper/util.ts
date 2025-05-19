import { gmail_v1 } from "@googleapis/gmail";

const getHeaderValue = (
    headers: gmail_v1.Schema$MessagePartHeader[],
    name: string
): string => {
    const header = headers?.find(
        (h) => h.name?.toLowerCase() === name.toLowerCase()
    );
    return header?.value || "";
};

export { getHeaderValue };
