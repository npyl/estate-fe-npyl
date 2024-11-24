import { useFiltersContext } from "../context";
import ToggleButton from "@mui/material/ToggleButton";
import ClearIcon from "@mui/icons-material/Clear";
import { MouseEvent, useCallback } from "react";

const ClearButton = () => {
    const { setCalendarId } = useFiltersContext();

    const handleClear = useCallback((e: MouseEvent) => {
        e.preventDefault();
        setCalendarId("");
    }, []);

    return (
        <ToggleButton
            value=""
            onClick={handleClear}
            size="small"
            sx={{
                ml: 1,
                borderRadius: "100%",
            }}
        >
            <ClearIcon />
        </ToggleButton>
    );
};

export default ClearButton;
