import { Page } from "@playwright/test";
import { IUser } from "../../src/types/user";
import getToken from "../_util/getToken";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`;

const getAllUsers = async (page: Page): Promise<IUser[] | undefined> => {
    try {
        const token = await getToken(page);
        if (!token) throw "Bad token";

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

export default getAllUsers;
