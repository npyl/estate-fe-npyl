import { useState } from "react";
import { Fab, IconButton, Tooltip } from "@mui/material";
import { Adjustments as AdjustmentsIcon } from "../icons/adjustments";
import { SettingsDrawer } from "./settings-drawer";

export const SettingsButton = () => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = (): void => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Settings">
                <IconButton
                    onClick={handleOpen}
                    size="small"
                    sx={{
                        paddingLeft: 1,
                    }}
                >
                    <AdjustmentsIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <SettingsDrawer onClose={handleClose} open={open} />
        </>
    );
};
