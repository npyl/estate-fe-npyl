import { IconButton, SxProps, Theme } from "@mui/material";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import { useCallback } from "react";
import useModeCookie from "../useModeCookie";

const ModeButtonSx: SxProps<Theme> = {
    border: "1px solid",
    borderColor: "divider",
};

const ModeButton = () => {
    const [mode, set] = useModeCookie();

    const handleToggle = useCallback(() => {
        if (mode === "board") set("list");
        if (mode === "list") set("board");
    }, [mode]);

    return (
        <IconButton sx={ModeButtonSx} onClick={handleToggle}>
            {mode === "board" ? <AlignHorizontalLeftIcon /> : null}
            {mode === "list" ? <AlignVerticalBottomIcon /> : null}
        </IconButton>
    );
};

export default ModeButton;
