import { useCallback, useMemo } from "react";
import { ITab } from "@/types/tabs";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import useCookie from "@/hooks/useCookie";
import { useAuth } from "@/hooks/use-auth";

// -----------------------------------------------------------------------

/**
 * Helper method to check whether a questionedPath is contained inside a tabPath with respect to query param
 * @param path
 * @param questionedPath
 * @returns Whether the path in question (questionedPath) is *NOT* contained inside a tabPath (exising tab's path)
 */
const isntContained =
    (questionedPath: string) =>
    ({ path }: ITab) => {
        const tabUrl = new URL(path, window.location.href);
        const queUrl = new URL(questionedPath, window.location.href);

        // Compare pathnames
        if (tabUrl.pathname !== queUrl.pathname) return true;

        // Compare url params
        const tabParams = new URLSearchParams(tabUrl.search);
        const queParams = new URLSearchParams(queUrl.search);

        for (const [key, value] of queParams) {
            const test = tabParams.get(key);
            if (test !== value) return true;
        }

        return false;
    };

// INFO: beauty wrapper
const isntContainedWrap = (t: ITab) => (pn: string) => isntContained(pn)(t);

/**
 *
 * @param p a list of paths in question
 * @returns true if *NONE* of the paths is contained
 */
const isntContainedMultiple = (p: string[]) => (t: ITab) =>
    p.every(isntContainedWrap(t));

// -----------------------------------------------------------------------

type TTabState = Record<number, ITab[]>;

// -----------------------------------------------------------------------

const isSameTabOrg = (p0: string, p1: string) => {
    const url0 = new URL(p0, window.location.href);
    const url1 = new URL(p1, window.location.href);

    return url0.pathname === url1.pathname;
};

const isSameTab =
    (p: string) =>
    ({ path }: ITab) =>
        isSameTabOrg(path, p);

// -----------------------------------------------------------------------

const pushOrUpdate = (old: ITab[], t: ITab) => {
    // Update
    if (old.some(isSameTab(t.path))) {
        return old.map((ot) => (ot.path === t.path ? t : ot));
    }

    // Push
    return [...old, t];
};

// -----------------------------------------------------------------------

const updatePath = (old: ITab[], p: string, newP: string) =>
    old.map((ot) => (isSameTabOrg(ot.path, p) ? { ...ot, path: newP } : ot));

// -----------------------------------------------------------------------

const cookieName = "PPSubbarTabs";

const getTabsSafe = (ts: TTabState, userId: number) => {
    try {
        return ts?.[userId] || [];
    } catch (ex) {
        return [];
    }
};

const useTabState = () => {
    const { user } = useAuth();
    const userId = user?.id!;

    const [tabState, setTabState] = useCookie<TTabState>(cookieName, {});
    const tabs = useMemo(
        () => getTabsSafe(tabState, userId),
        [tabState, userId]
    );

    const pushTab = useCallback(
        (t: ITab) =>
            setTabState((old) => {
                const tabs = getTabsSafe(tabState, userId);
                const res = pushOrUpdate(tabs, t);
                return { ...old, [userId]: res };
            }),
        [setTabState, userId]
    );

    const router = useRouter();
    const pathname = usePathname();

    const removeTab = useCallback(
        (p: string) => {
            const tabs = getTabsSafe(tabState, userId);

            const res = tabs.filter(isntContained(p));
            setTabState({ ...tabState, [userId]: res });

            // Case 1: we have no more tabs
            if (res.length === 0) {
                const basePath = p.startsWith("/property")
                    ? "/property"
                    : p.startsWith("/customer")
                    ? "/customers"
                    : p.startsWith("/agreements")
                    ? "/agreements"
                    : "/";

                router.push(basePath);
            }
            // Case 2: we have more tabs
            else {
                const removeIdx = tabs.findIndex(isSameTab(p));
                const currentIdx = tabs.findIndex(isSameTab(pathname));

                // If we are removing a non-current tab, we mustn't redirect.
                if (removeIdx !== currentIdx) return;

                const isLast = removeIdx === tabs.length;

                const redirectIdx = isLast ? tabs.length - 1 : removeIdx;
                const newUrl = tabs.at(redirectIdx)?.path;

                if (!newUrl) return;

                router.push(newUrl);
            }
        },
        [tabState, userId, pathname]
    );

    const removeTabs = useCallback(
        (p: string[]) =>
            setTabState((old) => {
                const tabs = getTabsSafe(tabState, userId);
                const res = tabs.filter(isntContainedMultiple(p));
                return { ...old, [userId]: res };
            }),
        [setTabState, userId]
    );

    // --------------------------------------------------------------------
    // Tab Specific
    // --------------------------------------------------------------------

    const getTabData = useCallback(
        (p: string) => tabs?.find(isSameTab(p))?.data,
        [tabs]
    );

    const setTabPath = useCallback(
        (p: string, newP: string) =>
            setTabState((old) => {
                const tabs = getTabsSafe(tabState, userId);
                const newTabs = updatePath(tabs, p, newP) || [];
                return { ...old, [userId]: newTabs };
            }),
        [setTabState, userId]
    );

    return [
        tabs,
        {
            pushTab,
            removeTab,
            removeTabs,
            // ...
            setTabPath,
            getTabData,
        },
    ] as const;
};

export { isSameTabOrg };
export default useTabState;
