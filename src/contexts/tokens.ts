import { accessTokenKey, refreshTokenKey, chatTokenKey } from "@/constants";
import { TokenResponse } from "@/types/auth";

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
    removeTokens,
};
