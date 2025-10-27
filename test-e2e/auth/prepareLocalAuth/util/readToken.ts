import fs from "node:fs";
import { AUTH_FILE } from "../_constant";
import { accessTokenKey } from "../../../../src/constants";
import JSONParseSafe from "../../../../src/utils/JSONParseSafe";
import { BrowserContextOptions } from "@playwright/test";

type StorageState = Exclude<BrowserContextOptions["storageState"], undefined>;

const readToken = async (): Promise<string | undefined> => {
    const credentialsData = fs.readFileSync(AUTH_FILE, "utf8");

    const storageState = JSONParseSafe<StorageState>(credentialsData);
    if (!storageState || typeof storageState === "string") return;

    // Find the origin that contains localStorage
    const origin = storageState.origins?.find(
        (o) => o.localStorage && o.localStorage.length > 0
    );
    if (!origin) return;

    // Find the accessToken in localStorage
    const tokenItem = origin.localStorage.find(
        (item) => item.name === accessTokenKey
    );
    if (!tokenItem) return;

    return tokenItem.value;
};

export default readToken;
