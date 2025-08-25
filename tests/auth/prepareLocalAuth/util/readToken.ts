import fs from "fs";
import { AUTH_FILE } from "../_constant";

const readToken = async (): Promise<string | undefined> => {
    const credentialsData = fs.readFileSync(AUTH_FILE, "utf8");
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

    return tokenItem.value;
};

export default readToken;
