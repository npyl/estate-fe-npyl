import {
    useFiltersContext,
    useIntegrationSites,
} from "@/sections/Properties/FiltersContext";
import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import ChipLabel from "./ChipLabel";

const IntegrationsChip = () => {
    const { t } = useTranslation();

    const values = (useIntegrationSites() as string[]).join(", ");
    const { resetIntegrationSites } = useFiltersContext();

    return (
        <Chip
            label={<ChipLabel title={t("Integrations")} value={values} />}
            onDelete={resetIntegrationSites}
        />
    );
};

export default IntegrationsChip;
