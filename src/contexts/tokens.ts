import { accessTokenKey, refreshTokenKey } from "@/constants";

// ---------------------------------------------------------------------------------------------

const get = (key: string) => globalThis?.localStorage?.getItem(key);
const set = (key: string, value: string) =>
    globalThis?.localStorage?.setItem(key, value);
const remove = (key: string) => globalThis?.localStorage?.removeItem(key);

// ---------------------------------------------------------------------------------------------

const getAccessToken = () => get(accessTokenKey);
const setAccessToken = (v: string) => set(accessTokenKey, v);
const removeAccessToken = () => remove(accessTokenKey);

// ---------------------------------------------------------------------------------------------

const getRefreshToken = () => get(refreshTokenKey);
const setRefreshToken = (v: string) => set(refreshTokenKey, v);
const removeRefreshToken = () => remove(refreshTokenKey);

// ---------------------------------------------------------------------------------------------

export {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    // ...
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
};
