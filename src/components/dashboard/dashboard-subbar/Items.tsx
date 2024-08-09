import ClearIcon from "@mui/icons-material/Clear";
import {
    Stack,
    Button,
    ButtonProps,
    IconButton,
    StackProps,
} from "@mui/material";
import { useCallback, useMemo, MouseEvent } from "react";
import { useTabsContext } from "src/contexts/tabs";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import useResponsive from "@/hooks/useResponsive";
import { useRouter } from "next/router";

interface SubbarItemProps extends ButtonProps {
    current: boolean;
}

const SubbarItem = styled(Button)<SubbarItemProps>(({ theme, current }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    display: "flex",
    marginInline: 2,
    justifyContent: "space-between",
    alignItems: "center",

    ...(current
        ? {
              color: theme.palette.neutral?.[200],
              backgroundColor: theme.palette.primary.main,

              "&:hover": {
                  color: theme.palette.neutral?.[100],
                  backgroundColor: theme.palette.primary.dark,
              },
          }
        : {
              color:
                  theme.palette.mode === "light"
                      ? theme.palette.neutral?.[900]
                      : theme.palette.neutral?.[200],

              backgroundColor:
                  theme.palette.mode === "light"
                      ? theme.palette.background.paper
                      : theme.palette.neutral?.[800],
          }),
    boxShadow: theme.shadows[5],
    transition: "all 0.3s ease",
    cursor: "pointer",
    flexDirection: "row",
    minWidth: "275px",
    width: "max-content",
    maxWidth: "350px",
    // Text Content
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
}));

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

            const newUrl = hasMoreAfterRemove
                ? isCurrentLast
                    ? tabsAfterRemove[tabsAfterRemove.length - 1].path
                    : tabsAfterRemove[currentTabIndex].path
                : "/property";

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
                    endIcon={
                        <IconButton
                            onClick={(e) => handleRemove(e, id)}
                            size="small"
                        >
                            <ClearIcon
                                sx={{
                                    fontSize: "15px",
                                }}
                            />
                        </IconButton>
                    }
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
