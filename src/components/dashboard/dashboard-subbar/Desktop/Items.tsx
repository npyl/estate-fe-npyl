import { Stack, StackProps } from "@mui/material";
import {
    FC,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState,
} from "react";
import { ITab } from "@/types/tabs";
import dynamic from "next/dynamic";
import { SubbarRef } from "@/contexts/tabs";
const TabItem = dynamic(() => import("./Item"));

const pushOrUpdate = (t: ITab) => (old: ITab[]) => {
    // Update
    if (old.some(({ path }) => path === t.path))
        return old.map((ot) => (ot.path === t.path ? t : ot));

    // Push
    return [...old, t];
};

const getTabItem: FC<ITab> = ({ label, path }) => (
    <TabItem key={path} label={label} path={path} />
);

const SubbarItems = forwardRef<SubbarRef, StackProps>((props, ref) => {
    const [tabs, setTabs] = useState<ITab[]>([]);

    const pushTab = useCallback((t: ITab) => setTabs(pushOrUpdate(t)), []);

    const removeTab = useCallback(
        (p: string) => setTabs((old) => old.filter(({ path }) => path !== p)),
        []
    );

    useImperativeHandle(
        ref,
        () => ({
            pushTab,
            removeTab,
        }),
        [pushTab, removeTab]
    );

    return (
        <Stack direction="row" spacing={1.5} {...props}>
            {tabs.map(getTabItem)}
        </Stack>
    );
});

SubbarItems.displayName = "SubbarItems";

export default SubbarItems;
