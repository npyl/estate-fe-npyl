import { useCallback, useMemo } from "react";
import { ITab } from "@/types/tabs";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import useCookie from "@/hooks/useCookie";
import { useAuth } from "@/hooks/use-auth";
import { isSameTab, isSameTabOrg } from "./util";
import {
    isntContained,
    isntContainedMultiple,
    pushOrUpdate,
    updatePath,
} from "./methods";

// -----------------------------------------------------------------------

type TTabState = Record<number, ITab[]>;

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
    const _tabs = useMemo(
        () => getTabsSafe(tabState, userId),
        [tabState, userId]
    );

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

    const getTabData = useCallback(
        (p: string) => _tabs?.find(isSameTab(p))?.data,
        [_tabs]
    );

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
            getTabData,
        }),
        [
            pushTab,
            setTabs,
            removeTab,
            removeTabs,
            // ...
            setTabPath,
            getTabData,
        ]
    );

    return [_tabs, methods] as const;
};

export { isSameTabOrg };
export default useTabState;
