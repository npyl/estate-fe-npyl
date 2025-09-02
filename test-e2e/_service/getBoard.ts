import { Page } from "@playwright/test";
import { IKanbanBoard } from "../../src/types/tasks";
import getToken from "../_util/getToken";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/kanban`;

const getBoard = async (page: Page): Promise<IKanbanBoard | undefined> => {
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

export default getBoard;
