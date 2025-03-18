import { Stack, StackProps } from "@mui/material";
import { FC, forwardRef, useImperativeHandle } from "react";
import { ITab } from "@/types/tabs";
import dynamic from "next/dynamic";
import { SubbarRef } from "@/contexts/tabs";
import useTabState from "./useTabState";
const TabItem = dynamic(() => import("./Item"));

// ----------------------------------------------------------------------

const getTabItem: FC<ITab> = (t) => <TabItem key={t.path} t={t} />;

// ----------------------------------------------------------------------

const SubbarItems = forwardRef<SubbarRef, StackProps>((props, ref) => {
    const { tabs, pushTab, removeTab, removeTabs } = useTabState();

    useImperativeHandle(
        ref,
        () => ({
            pushTab,
            removeTab,
            removeTabs,
        }),
        [pushTab, removeTab, removeTabs]
    );

    return (
        <Stack
            direction="row"
            spacing={1.5}
            mb={tabs.length > 0 ? 1 : 0}
            {...props}
        >
            {tabs.map(getTabItem)}
        </Stack>
    );
});

SubbarItems.displayName = "SubbarItems";

export default SubbarItems;
