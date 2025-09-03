import { useCallback, useMemo } from "react";
import { ITab } from "@/types/tabs";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useAuth } from "@/sections/use-auth";
import { isSameTab, isSameTabOrg } from "./util";
import {
    isntContained,
    isntContainedMultiple,
    pushOrUpdate,
    updatePath,
} from "./methods";
import useTabStorage, { getTabsSafe } from "../useTabStorage";

// -----------------------------------------------------------------------

const getPathAfterClear = (p: string) => {
    if (p.startsWith("/property")) return "/property";
    if (p.startsWith("/customer")) return "/customer";
    if (p.startsWith("/agreements")) return "/agreements";
    return "/";
};

const useTabState = () => {
    const { user } = useAuth();
    const userId = user?.id!;
    const { tabState, tabs, setTabState } = useTabStorage();

    /**
     * Push a tab (If already exists with same path all rest fields will be overriden)
     */
    const pushTab = useCallback(
        (t: ITab, ud?: boolean) =>
            setTabState((old) => {
                const tabs = getTabsSafe(old, userId);
                const res = pushOrUpdate(tabs, t, ud);
                return { ...old, [userId]: res };
            }),
        [setTabState, userId]
    );

    const setTabs = useCallback(
        (newTabs: ITab[]) =>
            setTabState((old) => ({ ...old, [userId]: newTabs })),
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
                router.push(getPathAfterClear(p));
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
        [setTabState, tabState, userId, pathname]
    );

    const removeTabs = useCallback(
        (p: string[]) =>
            setTabState((old) => {
                const tabs = getTabsSafe(old, userId);
                const res = tabs.filter(isntContainedMultiple(p));
                return { ...old, [userId]: res };
            }),
        [setTabState, userId]
    );

    // --------------------------------------------------------------------
    // Tab Specific
    // --------------------------------------------------------------------

    const setTabPath = useCallback(
        (p: string, newP: string) =>
            setTabState((old) => {
                const tabs = getTabsSafe(old, userId);
                const newTabs = updatePath(tabs, p, newP) || [];
                return { ...old, [userId]: newTabs };
            }),
        [setTabState, userId]
    );

    const methods = useMemo(
        () => ({
            pushTab,
            setTabs,
            removeTab,
            removeTabs,
            // ...
            setTabPath,
        }),
        [
            pushTab,
            setTabs,
            removeTab,
            removeTabs,
            // ...
            setTabPath,
        ]
    );

    return [tabs, methods] as const;
};

export { isSameTabOrg };
export default useTabState;
