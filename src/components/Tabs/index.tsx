import MuiTabs, { TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import { parseAsInteger, useQueryState } from "nuqs";
import { FC, useCallback } from "react";

const paramKey = "tab";

interface TabsProps extends Omit<MuiTabsProps, "value" | "onChange"> {
    onChange?: (v: number) => void;
}

const Tabs: FC<TabsProps> = ({ onChange: _onChange, ...props }) => {
    const [i, setI] = useCurrentTab();
    const onChange = useCallback(
        (_: any, i: number) => {
            setI(i);
            _onChange?.(i);
        },
        [_onChange]
    );
    return <MuiTabs value={i} onChange={onChange} {...props} />;
};

const useCurrentTab = () =>
    useQueryState(paramKey, parseAsInteger.withDefault(0));

export { useCurrentTab };
export default Tabs;
