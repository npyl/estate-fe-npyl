import { accessTokenKey, refreshTokenKey, chatTokenKey } from "@/constants";
import { TokenResponse } from "@/types/auth";
import sleep from "@/utils/sleep";

// ---------------------------------------------------------------------------------------------
// Helpers

const get = (key: string) => globalThis?.localStorage?.getItem(key);
const set = (key: string, value: string) =>
    globalThis?.localStorage?.setItem(key, value);
const remove = (key: string) => globalThis?.localStorage?.removeItem(key);

// ---------------------------------------------------------------------------------------------
// Access & Refresh

const getAccessToken = () => get(accessTokenKey);
const setAccessToken = (v: string) => set(accessTokenKey, v);
const removeAccessToken = () => remove(accessTokenKey);

const getRefreshToken = () => get(refreshTokenKey);
const setRefreshToken = (v: string) => set(refreshTokenKey, v);
const removeRefreshToken = () => remove(refreshTokenKey);

// ---------------------------------------------------------------------------------------------
// Chat

const setChatToken = (v: string) => set(chatTokenKey, v);
const getChatToken = () => get(chatTokenKey);

// ---------------------------------------------------------------------------------------------
// Access & Refresh (ONLY!)

const getTokens = () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    return { accessToken, refreshToken };
};

const setTokens = (t: TokenResponse) => {
    const { token, refreshToken } = t;
    setAccessToken(token);
    setRefreshToken(refreshToken);
};

const setTokens_safe = async (t0: TokenResponse) => {
    setTokens(t0);

    let t1 = getTokens();
    while (t1.accessToken !== t0.token || t1.refreshToken !== t0.refreshToken) {
        t1 = getTokens();
        await sleep(50);
    }
};

const removeTokens = () => {
    removeAccessToken();
    removeRefreshToken();
};

// ---------------------------------------------------------------------------------------------

export {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    // ...
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
    // ...
    setChatToken,
    getChatToken,
    // ...
    getTokens,
    setTokens,
    setTokens_safe,
    removeTokens,
};
