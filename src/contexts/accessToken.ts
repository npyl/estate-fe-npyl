import { tokenKey } from "@/constants";

const getAccessToken = () => globalThis?.localStorage?.getItem(tokenKey);

const setAccessToken = (v: string) =>
    globalThis?.localStorage?.setItem(tokenKey, v);

const removeAccessToken = () => globalThis?.localStorage?.removeItem(tokenKey);

export { getAccessToken, setAccessToken, removeAccessToken };
