import ClearIcon from "@mui/icons-material/Clear";
import { Button, Divider, IconButton } from "@mui/material";
import { Box, Stack, height, styled } from "@mui/system";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { deleteSectionData, deleteTab, selectTabs } from "src/slices/tabs";
import { useDispatch } from "src/store";

const Subbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const tabs = useSelector(selectTabs);
    const currentPath = router.asPath;
    const ScrollBox = styled(Box)(({ theme }) => ({
        height: "50px", // increase height
        padding: "5px 0", // padding to the top and bottom
        paddingLeft: "5px",

        overflow: "auto",
        "&::-webkit-scrollbar": {
            height: "5px",
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 5px grey",
            borderRadius: "12px",
        },
        "&::-webkit-scrollbar-thumb": {
            background: theme.palette.grey[500],
            borderRadius: "100px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            background: theme.palette.grey[700],
        },
    }));
    const handleDeleteTab = (tabUuid: string, tabIndex: number) => {
        // Dispatch the delete actions
        dispatch(deleteTab(tabUuid));
        dispatch(deleteSectionData(tabUuid));

        // Calculate the new tab to move to
        let newTab;
        if (tabs.length > 1) {
            newTab =
                tabIndex === tabs.length - 1
                    ? tabs[tabIndex - 1]
                    : tabs[tabIndex + 1];
        } else {
            // Fallback route if there are no more tabs
            newTab = { path: "/" };
        }

        // Redirect to the new tab
        router.push(newTab.path);
    };
    return (
        <ScrollBox sx={{ overflowX: "auto" }}>
            <Stack direction={"row"} spacing={1}>
                {tabs.map((tab, index) => (
                    <Fragment key={index}>
                        <Stack
                            sx={{
                                bgcolor:
                                    currentPath === tab.path
                                        ? "primary.dark"
                                        : "darkenColor",
                                padding: "0px 0px",
                                borderRadius: 1,
                                boxShadow: `rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px`,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                    bgcolor:
                                        currentPath === tab.path
                                            ? "primary.dark"
                                            : "darkenColor", // replace "darkenColor" with the darker color for the unset state
                                },
                            }}
                            direction={"row"}
                            alignItems={"center"}
                        >
                            <Button
                                sx={{
                                    minWidth: "140px",
                                    maxWidth: "140px",
                                    height: "30px",
                                    color:
                                        currentPath === tab.path
                                            ? "white"
                                            : "unset",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                    fontSize: "0.8rem", // Reduce the font size
                                }}
                                variant="text"
                                id={tab.title}
                                onClick={() => router.push(tab.path)}
                            >
                                {tab.title}
                            </Button>
                            <IconButton
                                sx={{
                                    color:
                                        currentPath === tab.path
                                            ? "white"
                                            : "unset",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                }}
                                onClick={() => handleDeleteTab(tab.uuid, index)}
                            >
                                <ClearIcon sx={{ fontSize: 12 }} />
                            </IconButton>
                        </Stack>
                        {index !== tabs.length - 1 && (
                            <Divider orientation="vertical" flexItem />
                        )}
                    </Fragment>
                ))}
            </Stack>
        </ScrollBox>
    );
};

export default Subbar;
