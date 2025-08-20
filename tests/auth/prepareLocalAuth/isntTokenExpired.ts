import fs from "fs";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
const profileUrl = `${baseUrl}/users/profile`;

const isntTokenExpired = async (authFile: string) => {
    const credentialsData = fs.readFileSync(authFile, "utf8");
    const storageState = JSON.parse(credentialsData);

    // Find the origin that contains localStorage
    const origin = storageState.origins?.find(
        (o) => o.localStorage && o.localStorage.length > 0
    );

    if (!origin) return;

    // Find the accessToken in localStorage
    const tokenItem = origin.localStorage.find(
        (item) => item.name === "accessToken"
    );
    if (!tokenItem) return;

    const token = tokenItem.value;

    const res = await fetch(profileUrl, {
        headers: {
            Authorization: `Bearer  ${token}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    });

    if (!res.ok) return;

    const data = await res.json();

    const didFind = "firstName" in data;

    if (didFind) console.log("Found and using non-expired token!");

    return token;
};

export default isntTokenExpired;
