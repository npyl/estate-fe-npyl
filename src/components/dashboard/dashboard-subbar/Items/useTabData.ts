import { useAuth } from "@/hooks/use-auth";
import { ITab } from "@/types/tabs";
import { useMemo } from "react";
import { isSameTab } from "./useTabState/util";
import useCookie from "@/hooks/useCookie";

type TTabState = Record<number, ITab[]>;

const cookieName = "PPSubbarTabs";

const getTabsSafe = (ts: TTabState, userId: number) => {
    try {
        return ts?.[userId] || [];
    } catch (ex) {
        return [];
    }
};

const useTabData = (p: string) => {
    const { user } = useAuth();
    const userId = user?.id!;

    const [tabState] = useCookie<TTabState>(cookieName, {});

    const _tabs = useMemo(
        () => getTabsSafe(tabState, userId),
        [tabState, userId]
    );

    const data = useMemo(() => _tabs.find(isSameTab(p))?.data, [_tabs]);

    return data;
};

export default useTabData;
