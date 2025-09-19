import debugLog from "@/_private/debugLog";
import { BlogPostReq } from "@/types/company";
import isFalsy from "@/utils/isFalsy";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/blog`;

const createOrUpdate = async (
    Authorization: string,
    d: Omit<BlogPostReq, "images">
): Promise<number | null> => {
    try {
        const isCreate = isFalsy(d.id);
        const url = isCreate ? baseUrl : `${baseUrl}/${d.id!}`;
        const method = isCreate ? "POST" : "PUT";

        const res = await fetch(url, {
            headers: {
                Authorization,
                "Content-Type": "application/json",
            },
            method,
            body: JSON.stringify(d),
        });

        if (!res.ok) throw await res.json();

        // INFO: get id from response
        if (isCreate) {
            const id = await res.json();
            return id;
        }

        return d.id!;
    } catch (ex) {
        debugLog(ex);
        return null;
    }
};

export default createOrUpdate;
