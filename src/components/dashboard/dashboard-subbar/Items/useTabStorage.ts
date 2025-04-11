import { useAuth } from "@/hooks/use-auth";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ITab } from "@/types/tabs";
import { useMemo } from "react";

type TTabState = Record<number, ITab[]>;

const cookieName = "PPSubbarTabs";

const getTabsSafe = (ts: TTabState, userId: number) => {
    try {
        return ts?.[userId] || [];
    } catch (ex) {
        return [];
    }
};

/**
 * Hook for getting tabs' state from their storage
 */
const useTabStorage = () => {
    const { user } = useAuth();
    const userId = user?.id!;

    const [tabState, setTabState] = useLocalStorage<TTabState>(cookieName, {});

    const tabs = useMemo(
        () => getTabsSafe(tabState, userId),
        [tabState, userId]
    );

    return { tabState, tabs, setTabState };
};

export { getTabsSafe };
export default useTabStorage;
