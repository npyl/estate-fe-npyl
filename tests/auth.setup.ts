import { test as setup } from "@playwright/test";
import path from "path";
import fs from "fs";
import { UserResponse } from "../src/types/auth";
import gotoSafe from "./_util/gotoSafe";

const privFile = path.join(__dirname, "../playwright/.auth/priv.json");
const authFile = path.join(__dirname, "../playwright/.auth/user.json");

const localhost = "http://127.0.0.1:3000";
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
const loginUrl = `${baseUrl}/login`;
const profileUrl = `${baseUrl}/users/profile`;

const CREDENTIALS_ERROR =
    "Username or password not found in credentials file! Please fill-in credentials in playwright/.auth/priv.json";

type TCredentials = { username: string; password: string };

const getCredentials = (): TCredentials => {
    let credentials;

    const credentialsData = fs.readFileSync(privFile, "utf8");
    credentials = JSON.parse(credentialsData);

    const { username, password } = credentials;
    if (!username || !password) throw new Error(CREDENTIALS_ERROR);

    return { username, password };
};

const isntTokenExpired = async (authFile: string) => {
    const credentialsData = fs.readFileSync(authFile, "utf8");
    const storageState = JSON.parse(credentialsData);

    // Find the origin that contains localStorage
    const origin = storageState.origins?.find(
        (o) => o.localStorage && o.localStorage.length > 0
    );

    if (!origin) return false;

    // Find the accessToken in localStorage
    const tokenItem = origin.localStorage.find(
        (item) => item.name === "accessToken"
    );
    if (!tokenItem) return false;

    const token = tokenItem.value;

    const res = await fetch(profileUrl, {
        headers: {
            Authorization: `Bearer  ${token}`,
            "Content-Type": "application/json",
        },
        method: "GET",
    });

    if (!res.ok) return false;

    const data = await res.json();

    const didFind = "firstName" in data;

    if (didFind) console.log("Found and using non-expired token!");

    return didFind;
};

const login = async (credentials: TCredentials) => {
    const res = await fetch(loginUrl, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(credentials),
    });

    if (!res.ok) return false;

    const data = (await res.json()) as UserResponse;
    if (!("token" in data)) return false;

    return data.token;
};

setup("authenticate", async ({ page }) => {
    // Check if auth file already exists & token hasn't expired
    if (fs.existsSync(authFile) && (await isntTokenExpired(authFile))) return;

    // Get (private) credentials for tester user
    const CREDENTIALS = getCredentials();

    const token = await login(CREDENTIALS);
    if (!token) throw "Did not receive a token!";

    // Navigate to your app and wait for it to load
    await gotoSafe(page, localhost);

    // Wait a bit for the page to be ready
    await page.waitForTimeout(1000);

    // Set the accessToken in localStorage
    await page.addInitScript((token) => {
        localStorage.setItem("accessToken", token);
    }, token);

    // Reload the page to ensure the token is set
    await page.reload();

    // Save authenticated state
    console.log("Storing token");
    await page.context().storageState({ path: authFile });
});
