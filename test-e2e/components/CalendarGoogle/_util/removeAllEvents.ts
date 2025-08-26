import readToken from "../../../auth/prepareLocalAuth/util/readToken";
import getProfileId from "../../../auth/prepareLocalAuth/service/getProfileId";

const getUrl = (userId: number) =>
    `http://127.0.0.1:3000/api/calendar/${userId}/events/removeAll`;

/**
 * Remove all calendar events on a specific day
 * @param date
 */
const removeAllEvents = async (date: string) => {
    try {
        const token = await readToken();
        if (!token) throw "This shouldnt happen";

        const userId = await getProfileId(token);
        const url = getUrl(userId);

        const res = await fetch(url, {
            body: JSON.stringify({ date }),
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw await res.json();
        await res.json();
    } catch (ex) {
        console.log(ex);
    }
};

export default removeAllEvents;
