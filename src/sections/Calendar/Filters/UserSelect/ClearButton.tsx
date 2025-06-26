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
            sx={{
                width: "30px",
                height: "30px",
                borderRadius: "100%",
            }}
        >
            <ClearIcon fontSize="small" />
        </ToggleButton>
    );
};

export default ClearButton;
