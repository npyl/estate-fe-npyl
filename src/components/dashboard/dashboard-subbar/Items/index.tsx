import { Stack, StackProps } from "@mui/material";
import { FC, forwardRef, useImperativeHandle } from "react";
import { ITab } from "@/types/tabs";
import dynamic from "next/dynamic";
import { SubbarRef } from "@/contexts/tabs";
import useTabState from "./useTabState";
import useTabPusher from "./useTabPusher";
const TabItem = dynamic(() => import("./Item"));

// ----------------------------------------------------------------------

const getTabItem: FC<ITab> = (t) => <TabItem key={t.path} t={t} />;

// ----------------------------------------------------------------------

const SubbarItems = forwardRef<SubbarRef, StackProps>((props, ref) => {
    const [tabs, methods] = useTabState();

    useImperativeHandle(ref, () => methods, [methods]);

    useTabPusher(methods.pushTab, methods.setTabPath);

    return (
        <Stack direction="row" spacing={1.5} {...props}>
            {tabs.map(getTabItem)}
        </Stack>
    );
});

SubbarItems.displayName = "SubbarItems";

export default SubbarItems;
