import MuiTabs, { TabsProps as MuiTabsProps } from "@mui/material/Tabs";
import { parseAsInteger, useQueryState } from "nuqs";
import { FC, useCallback } from "react";
import HorizontalScrollbar from "@/components/HorizontalScrollbar";
import { SxProps, Theme } from "@mui/material";

const TabsSx: SxProps<Theme> = {
    overflow: "visible",
    width: "fit-content",

    ".MuiTab-root": {
        textWrap: "nowrap",
        whiteSpace: "nowrap",
        minWidth: "fit-content",
    },
};

const paramKey = "tab";

interface TabsProps extends Omit<MuiTabsProps, "value" | "onChange"> {
    onChange?: (v: number) => void;
}

const Tabs: FC<TabsProps> = ({ onChange: _onChange, sx, ...props }) => {
    const [i, setI] = useCurrentTab();
    const onChange = useCallback(
        (_: any, i: number) => {
            setI(i);
            _onChange?.(i);
        },
        [_onChange]
    );
    return (
        <HorizontalScrollbar>
            <MuiTabs
                variant="fullWidth"
                value={i}
                onChange={onChange}
                sx={{ ...TabsSx, ...sx }}
                {...props}
            />
        </HorizontalScrollbar>
    );
};

const useCurrentTab = () =>
    useQueryState(paramKey, parseAsInteger.withDefault(0));

export { useCurrentTab };
export default Tabs;
