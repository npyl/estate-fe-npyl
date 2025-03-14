import { useCallback } from "react";
import { ITab } from "@/types/tabs";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import useCookie from "@/hooks/useCookie";
import { useAuth } from "@/hooks/use-auth";

// -----------------------------------------------------------------------

type TTabState = Record<number, ITab[]>;

// -----------------------------------------------------------------------

const pushOrUpdate = (old: ITab[], userId: number, t: ITab) => {
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
    const tabs = tabState?.[userId] || [];

    const pushTab = useCallback(
        (t: ITab) => {
            const res = pushOrUpdate(tabs, userId, t);
            setTabState({ ...tabState, [userId]: res });
        },
        [tabState, tabs, userId]
    );

    const router = useRouter();
    const pathname = usePathname();

    const removeTab = useCallback(
        (p: string) => {
            const res = tabs.filter(({ path }) => path !== p);
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
            const res = tabs.filter(({ path }) => !p.includes(path));
            setTabState({ ...tabState, [userId]: res });
        },
        [tabState, userId]
    );

    return { tabs, pushTab, removeTab, removeTabs };
};

export default useTabState;
