import { useTranslation } from "react-i18next";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import ChipLabel from "@/sections/Filters/ChipLabel";
import Chip from "@mui/material/Chip";

const FromChip = () => {
    const { t } = useTranslation();
    const { filters } = useFiltersContext();
    const { from } = filters;
    return <Chip label={<ChipLabel title={t("From")} value={from} />} />;
};

export default FromChip;
