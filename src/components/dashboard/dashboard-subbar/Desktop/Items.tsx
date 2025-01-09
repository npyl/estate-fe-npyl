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
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
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

    const router = useRouter();
    const pathname = usePathname();

    const removeTab = useCallback(
        (p: string) => {
            const res = tabs.filter(({ path }) => path !== p);
            setTabs(res);

            // Case 1: we have no more tabs
            if (res.length === 0) {
                const basePath = p.startsWith("/property")
                    ? "/property"
                    : p.startsWith("/customer")
                    ? "/customers"
                    : "/customers";

                router.push(basePath);
            }
            // Case 2: we have more tabs
            else {
                const removeIdx = tabs.findIndex(({ path }) => path === p);
                const currentIdx = tabs.findIndex(
                    ({ path }) => path === pathname
                );

                // If we are removing a non-current tab, we mustn't redirect.
                if (removeIdx !== currentIdx) return;

                const isLast = removeIdx === tabs.length;

                const redirectIdx = isLast ? tabs.length - 1 : removeIdx;
                const newUrl = tabs.at(redirectIdx)?.path;

                if (!newUrl) return;

                router.push(newUrl);
            }
        },
        [tabs, pathname]
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
