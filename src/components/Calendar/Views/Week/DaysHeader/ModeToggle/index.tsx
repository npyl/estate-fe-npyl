import Stack from "@mui/material/Stack";
import MondayIcon from "./Monday";
import SundayIcon from "./Sunday";
import IconButton from "@mui/material/IconButton";
import { useCallback } from "react";
import useModeCookie from "@/components/BaseCalendar/useModeCookie";
import { MODE_TOGGLE_WIDTH } from "../constants";

const ModeToggle = () => {
    const [mode, set] = useModeCookie();

    const handleToggle = useCallback(() => {
        if (mode === "monToSun") set("sunToSat");
        if (mode === "sunToSat") set("monToSun");
    }, [mode]);

    return (
        <Stack
            width={MODE_TOGGLE_WIDTH}
            justifyContent="center"
            alignItems="center"
        >
            <IconButton onClick={handleToggle}>
                {mode === "monToSun" ? <SundayIcon /> : <MondayIcon />}
            </IconButton>
        </Stack>
    );
};

export default ModeToggle;
