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
import useAutosaveRouter from "src/components/Router/Autosave";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import useResponsive from "@/hooks/useResponsive";

interface SubbarItemProps extends ButtonProps {
    current: boolean;
}

const SubbarItem = styled(Button)<SubbarItemProps>(({ theme, current }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),

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

    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1),

    transition: "all 0.3s ease",

    cursor: "pointer",

    flexDirection: "row",
    alignItems: "center",

    minWidth: "70px",

    // Text Content
    overflowX: "hidden",
    overflowY: "hidden",
    textWrap: "nowrap",
}));

// Truncate
const getLabel = (belowSm: boolean, label: string) => {
    let res = label;

    if (belowSm) {
        const parts = label.split(" ");
        res = parts[parts.length - 1];
    }

    return res;
};

const SubbarItems = (props: StackProps) => {
    const router = useAutosaveRouter();
    const { appTabs, removeTab, removeTabNoChange } = useTabsContext();

    const currentPath = useMemo(() => router.asPath, [router.asPath]);

    const handleClick = useCallback((e: MouseEvent, p: string) => {
        e.stopPropagation();
        router.push(p);
    }, []);

    const handleRemove = useCallback(
        (e: MouseEvent, id: string) => {
            e.stopPropagation();

            // get list of tabs if we removed one with specific id
            const tabsAfterRemove = removeTabNoChange(id);

            const currentTabIndex = appTabs.findIndex(
                ({ id: _id }) => _id === id
            );
            const isCurrentLast = appTabs[appTabs.length - 1].id === id;
            const hasMoreAfterRemove = tabsAfterRemove.length > 0;

            // decide what tab to show after closing
            const newUrl = hasMoreAfterRemove
                ? isCurrentLast
                    ? // open last tab
                      tabsAfterRemove[tabsAfterRemove.length - 1].path
                    : // keep tab on same index open
                      tabsAfterRemove[currentTabIndex].path
                : "/property"; // open general tab

            // actually remove
            removeTab(id);

            // go to last page url
            router.push(newUrl);
        },
        [appTabs]
    );

    const belowSm = useResponsive("down", "sm");

    return (
        <Stack direction="row" spacing={1} {...props}>
            {appTabs.map(({ id, label, path }) => (
                <SubbarItem
                    key={id}
                    current={currentPath === path}
                    endIcon={
                        <IconButton onClick={(e) => handleRemove(e, id)}>
                            <ClearIcon
                                sx={{
                                    fontSize: "15px",
                                }}
                            />
                        </IconButton>
                    }
                    onClick={(e) => handleClick(e, path)}
                >
                    {getLabel(belowSm, label)}
                </SubbarItem>
            ))}
        </Stack>
    );
};

export default SubbarItems;
