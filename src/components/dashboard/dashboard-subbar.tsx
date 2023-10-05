import ClearIcon from "@mui/icons-material/Clear";
import { Button, Divider, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";
import { ScrollBox } from "../ScrollBox";

import { useTabsContext } from "src/contexts/tabs";

const Subbar = () => {
    const router = useRouter();
    const { appTabs, removeTab } = useTabsContext();

    const currentPath = useMemo(() => router.asPath, [router.asPath]);

    // const handleSelectTab = (tab: ITabsProps) => {
    //     resetPropertyState();
    //     resetPropertyFilesState();
    //     resetCustomerState();
    //     resetCustomerMiscState();
    //     resetLabelsState();
    //     resetNotesState();

    //     router.push(tab.path);
    // };

    return (
        <ScrollBox sx={{ overflowX: "auto" }}>
            <Stack direction={"row"} spacing={1}>
                {appTabs.map((tab, index) => (
                    <Fragment key={tab.id}>
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
                                    fontSize: "0.8rem",
                                    display: "flex",
                                    direction: "rtl",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                }}
                                variant="text"
                                onClick={() => router.push(tab.path)}
                            >
                                <span
                                    style={{
                                        direction: "ltr",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {tab.label}
                                </span>
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
                                onClick={() => removeTab(tab.id)}
                            >
                                <ClearIcon sx={{ fontSize: 12 }} />
                            </IconButton>
                        </Stack>
                        {index !== appTabs.length - 1 && (
                            <Divider orientation="vertical" flexItem />
                        )}
                    </Fragment>
                ))}
            </Stack>
        </ScrollBox>
    );
};

export default Subbar;
