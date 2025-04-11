import { useMemo } from "react";
import { isSameTab } from "./useTabState/util";
import useTabStorage from "./useTabStorage";

const useTabData = (p: string) => {
    const { tabs } = useTabStorage();
    const data = useMemo(() => tabs.find(isSameTab(p))?.data, [tabs]);
    return data;
};

export default useTabData;
