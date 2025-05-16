import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import useValueChange from "@/sections/DataGrids/BulkEditDrawer/useValueChange";

const StayUpdated = () => {
    const { t } = useTranslation();
    const [value, onChange] = useValueChange("enableEmails");
    return (
        <Stack>
            <InputLabel>{t("Stay Updated")}</InputLabel>
            <ToggleButtonGroup exclusive value={value} onChange={onChange}>
                <ToggleButton value="">{t("Not selected")}</ToggleButton>
                <ToggleButton value={false}>{t("No")}</ToggleButton>
                <ToggleButton value={true}>{t("Yes")}</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

export default StayUpdated;
