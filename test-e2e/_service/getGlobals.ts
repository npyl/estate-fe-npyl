import { Page } from "@playwright/test";
import { IGlobal } from "../../src/types/global";
import getToken from "../_util/getToken";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/global`;

const getGlobals = async (page: Page): Promise<IGlobal | undefined> => {
    try {
        const token = await getToken(page);
        if (!token) throw "Could not receive token";

        const res = await fetch(baseUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw await res.json();
        return await res.json();
    } catch (ex) {
        console.log(ex);
    }
};

export default getGlobals;
