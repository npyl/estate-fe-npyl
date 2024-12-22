import { Stack, StackProps } from "@mui/material";
import {
    FC,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useState,
} from "react";
import { ITab } from "@/interfaces/tabs";
import dynamic from "next/dynamic";
import { SubbarRef } from "@/contexts/tabs";
const TabItem = dynamic(() => import("./Item"));

const getTabItem: FC<ITab> = ({ id, label, path }) => (
    <TabItem key={id} id={id} label={label} path={path} />
);

const SubbarItems = forwardRef<SubbarRef, StackProps>((props, ref) => {
    const [tabs, setTabs] = useState<ITab[]>([]);

    const pushTab = useCallback((i: ITab) => setTabs((old) => [...old, i]), []);
    const removeTab = useCallback(() => {}, []);

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
