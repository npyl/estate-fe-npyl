import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import useValueChange from "@/sections/DataGrids/BulkEditDrawer/useValueChange";
import PublicSitesPicker from "@/ui/Pickers/PublicSites";

const Active = () => {
    const { t } = useTranslation();

    const [value, onChange] = useValueChange("publicSites");

    return (
        <Stack>
            <InputLabel>{t("Active")}</InputLabel>
            <PublicSitesPicker sites={value} onChange={onChange} />
        </Stack>
    );
};

export default Active;
