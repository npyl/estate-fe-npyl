import { useMemo } from "react";
import { isSameTab } from "./useTabState/util";
import useTabStorage from "./useTabStorage";
import { TPropertyFilterExtended } from "@/types/properties";

const useTabData = (p: string) => {
    const { tabs } = useTabStorage();
    const data = useMemo(() => tabs.find(isSameTab(p))?.data, [tabs]);
    return data as TPropertyFilterExtended | undefined;
};

export default useTabData;
