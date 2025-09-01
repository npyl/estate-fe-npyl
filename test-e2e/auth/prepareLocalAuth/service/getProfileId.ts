import { IUser } from "../../../../src/types/user";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
const profileUrl = `${baseUrl}/users/profile`;

const getProfileId = async (accessToken: string): Promise<number> => {
    try {
        const res = await fetch(profileUrl, {
            headers: {
                Authorization: `Bearer  ${accessToken}`,
                "Content-Type": "application/json",
            },
            method: "GET",
        });

        if (!res.ok) throw await res.json();

        const data = (await res.json()) as IUser;

        return data.id ?? -1;
    } catch (ex) {
        return -1;
    }
};

export default getProfileId;
