import { useSettingsContext } from "@/components/BaseCalendar/Settings";
import Stack from "@mui/material/Stack";
import MondayIcon from "./Monday";
import SundayIcon from "./Sunday";
import IconButton from "@mui/material/IconButton";
import { useCallback } from "react";

const ModeToggle = () => {
    const { weekViewMode, setWeekViewMode } = useSettingsContext();

    const handleToggle = useCallback(
        () =>
            setWeekViewMode((old) =>
                old === "monToSun" ? "sunToSat" : "monToSun"
            ),
        []
    );

    return (
        <Stack width="50px" justifyContent="center" alignItems="center">
            <IconButton onClick={handleToggle}>
                {weekViewMode === "monToSun" ? <SundayIcon /> : <MondayIcon />}
            </IconButton>
        </Stack>
    );
};

export default ModeToggle;
