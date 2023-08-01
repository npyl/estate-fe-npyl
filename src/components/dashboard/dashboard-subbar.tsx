import ClearIcon from "@mui/icons-material/Clear";
import { Button, Divider, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
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
        <Stack direction={"row"} spacing={2}>
            {tabs.map((tab, index) => (
                <Fragment key={index}>
                    <Stack
                        sx={{
                            bgcolor:
                                currentPath === tab.path
                                    ? "primary.dark"
                                    : "darkenColor",
                            padding: "0px 8px",
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
                                minWidth: "90px",
                                color:
                                    currentPath === tab.path
                                        ? "white"
                                        : "unset",
                                "&:hover": {
                                    background: "transparent",
                                },
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
                            <ClearIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                    </Stack>
                    {index !== tabs.length - 1 && (
                        <Divider orientation="vertical" flexItem />
                    )}
                </Fragment>
            ))}
        </Stack>
    );
};

export default Subbar;
