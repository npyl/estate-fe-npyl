import { SelectedSx } from "@/components/AvatarSelectGroup";
import { useFiltersContext } from "../context";
import ToggleButton from "@mui/material/ToggleButton";
import { MouseEvent, useCallback } from "react";
import { useTranslation } from "react-i18next";

const AllButton = () => {
    const { t } = useTranslation();
    const { calendarId, setCalendarId } = useFiltersContext();

    const handleClick = useCallback((e: MouseEvent) => {
        e.preventDefault();
        setCalendarId("ADMIN_ALL");
    }, []);

    return (
        <ToggleButton
            value="ADMIN_ALL"
            onClick={handleClick}
            selected={calendarId === "ADMIN_ALL"}
            size="small"
            sx={{
                borderRadius: "100%",
                "&.Mui-selected": {
                    borderWidth: "3px",
                    ...(SelectedSx as any),
                },
            }}
        >
            {t("All")}
        </ToggleButton>
    );
};

export default AllButton;
