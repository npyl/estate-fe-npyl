import ClearIcon from "@mui/icons-material/Clear";
import { Button, ButtonProps, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useCallback, useMemo, MouseEvent } from "react";
import { ScrollBox } from "../ScrollBox";
import { useTabsContext } from "src/contexts/tabs";
import useAutosaveRouter from "src/components/Router/Autosave";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";

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
}));

const Subbar = () => {
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

            // get id of last tab or /property page
            const newUrl =
                tabsAfterRemove.length > 0
                    ? tabsAfterRemove[tabsAfterRemove.length - 1].path
                    : "/property";

            // actually remove
            removeTab(id);

            // go to last page url
            router.push(newUrl);
        },
        [appTabs]
    );

    return (
        <ScrollBox sx={{ overflowX: "auto" }}>
            <Stack direction={"row"} spacing={1}>
                {appTabs.map(({ id, label, path }, i) => (
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
                        <Typography variant="body2">{label}</Typography>
                    </SubbarItem>
                ))}
            </Stack>
        </ScrollBox>
    );
};

export default Subbar;
