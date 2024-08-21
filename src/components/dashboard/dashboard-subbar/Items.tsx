import MuiClearIcon from "@mui/icons-material/Clear";
import { Stack, StackProps } from "@mui/material";
import { useCallback, useMemo, MouseEvent } from "react";
import { useTabsContext } from "src/contexts/tabs";
import useResponsive from "@/hooks/useResponsive";
import { useRouter } from "next/router";
import SubbarItem from "./SubbarItem";
import { styled } from "@mui/material/styles";

const ClearIcon = styled(MuiClearIcon)({
    height: "20px",
    width: "20px",
    padding: "3px",
    "&:hover": {
        borderRadius: "20px",
        backgroundColor: "white",
        color: "black",
    },
});

const getLabel = (belowSm: boolean, label: string) => {
    let res = label;

    if (belowSm) {
        const parts = label.split(" ");
        res = parts[parts.length - 1]; // First two words only
    }

    return res;
};

const SubbarItems = (props: StackProps) => {
    const router = useRouter();
    const { appTabs, removeTab, removeTabNoChange } = useTabsContext();

    const currentPath = useMemo(() => router.asPath, [router.asPath]);

    const handleClick = useCallback((e: MouseEvent, p: string) => {
        e.stopPropagation();
        router.push(p);
    }, []);

    const handleRemove = useCallback(
        (e: MouseEvent, id: string) => {
            e.stopPropagation();

            const tabsAfterRemove = removeTabNoChange(id);

            const currentTabIndex = appTabs.findIndex(
                ({ id: _id }) => _id === id
            );
            const isCurrentLast = appTabs[appTabs.length - 1].id === id;
            const hasMoreAfterRemove = tabsAfterRemove.length > 0;

            // Determine the base path based on the current path
            const basePath = currentPath.startsWith("/property")
                ? "/property"
                : currentPath.startsWith("/customer")
                ? "/customers"
                : "/customers";

            const newUrl = hasMoreAfterRemove
                ? isCurrentLast
                    ? tabsAfterRemove[tabsAfterRemove.length - 1].path
                    : tabsAfterRemove[currentTabIndex].path
                : basePath;

            removeTab(id);

            router.push(newUrl);
        },
        [appTabs]
    );

    const belowSm = useResponsive("down", "sm");

    return (
        <Stack direction="row" spacing={1.5} {...props}>
            {appTabs.map(({ id, label, path }) => (
                <SubbarItem
                    key={id}
                    current={currentPath === path}
                    endIcon={<ClearIcon onClick={(e) => handleRemove(e, id)} />}
                    onClick={(e) => handleClick(e, path)}
                >
                    {/* Code to keep the Clear icon always inside the SubbarItem and cut the text with '...' */}
                    <span
                        style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flex: 1,
                        }}
                    >
                        {getLabel(belowSm, label)}
                    </span>
                </SubbarItem>
            ))}
        </Stack>
    );
};

export default SubbarItems;
