import MuiTabs, { TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import { parseAsInteger, useQueryState } from "nuqs";
import { FC, useCallback } from "react";

const paramKey = "tab";

interface TabsProps extends Omit<MuiTabsProps, "value" | "onChange"> {}

const Tabs: FC<TabsProps> = (props) => {
    const [i, setI] = useCurrentTab();
    const onChange = useCallback((_: any, i: number) => setI(i), []);
    return <MuiTabs value={i} onChange={onChange} {...props} />;
};

const useCurrentTab = () =>
    useQueryState(paramKey, parseAsInteger.withDefault(0));

export { useCurrentTab };
export default Tabs;
