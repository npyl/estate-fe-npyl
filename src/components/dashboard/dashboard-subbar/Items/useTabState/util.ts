import { ITab } from "@/types/tabs";

const isSameTabOrg = (p0: string, p1: string) => {
    const url0 = new URL(p0, window.location.href);
    const url1 = new URL(p1, window.location.href);

    return url0.pathname === url1.pathname;
};

const isSameTab =
    (p: string) =>
    ({ path }: ITab) =>
        isSameTabOrg(path, p);

export { isSameTab, isSameTabOrg };
