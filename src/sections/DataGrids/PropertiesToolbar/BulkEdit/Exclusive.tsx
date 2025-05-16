import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import IOSSwitch from "@/components/iOSSwitch";
import useValueChange from "@/sections/DataGrids/BulkEditDrawer/useValueChange";

const Exclusive = () => {
    const { t } = useTranslation();

    const [value, onChange] = useValueChange("exclusive");

    return (
        <Stack>
            <InputLabel>{t("Exclusive")}</InputLabel>
            <IOSSwitch value={value} onChange={(_, b) => onChange(b)} />
        </Stack>
    );
};

export default Exclusive;
