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

const pushOrUpdate = (old: ITab[], t: ITab) => {
    // Update
    if (old.some(({ path }) => path === t.path)) {
        return old.map((ot) => (ot.path === t.path ? t : ot));
    }

    // Push
    return [...old, t];
};

// -----------------------------------------------------------------------

const cookieName = "PPSubbarTabs";

const useTabState = () => {
    const { user } = useAuth();
    const userId = user?.id!;

    const [tabState, setTabState] = useCookie<TTabState>(cookieName, {});
    const tabs = useMemo(() => {
        try {
            return tabState?.[userId] || [];
        } catch (ex) {
            return [];
        }
    }, [tabState, userId]);

    const pushTab = useCallback(
        (t: ITab) => {
            const res = pushOrUpdate(tabs, t);
            setTabState({ ...tabState, [userId]: res });
        },
        [tabState, tabs, userId]
    );

    const router = useRouter();
    const pathname = usePathname();

    const removeTab = useCallback(
        (p: string) => {
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
                const removeIdx = tabs.findIndex(({ path }) => path === p);
                const currentIdx = tabs.findIndex(
                    ({ path }) => path === pathname
                );

                // If we are removing a non-current tab, we mustn't redirect.
                if (removeIdx !== currentIdx) return;

                const isLast = removeIdx === tabs.length;

                const redirectIdx = isLast ? tabs.length - 1 : removeIdx;
                const newUrl = tabs.at(redirectIdx)?.path;

                if (!newUrl) return;

                router.push(newUrl);
            }
        },
        [tabState, tabs, userId, pathname]
    );

    const removeTabs = useCallback(
        (p: string[]) => {
            const res = tabs.filter(isntContainedMultiple(p));
            setTabState({ ...tabState, [userId]: res });
        },
        [tabs, tabState, userId]
    );

    return { tabs, pushTab, removeTab, removeTabs };
};

export default useTabState;
