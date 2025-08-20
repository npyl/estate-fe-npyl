import { IUser } from "../../../src/types/user";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
const profileUrl = `${baseUrl}/users/profile`;

const getProfile = async (accessToken: string) => {
    const res = await fetch(profileUrl, {
        headers: {
            Authorization: `Bearer  ${accessToken}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    });

    if (!res.ok) return;

    const data = (await res.json()) as IUser;

    const didFind = "firstName" in data;

    if (didFind) console.log("Found and using non-expired token!");

    return data.id;
};

export default getProfile;
