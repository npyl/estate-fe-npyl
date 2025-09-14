import { useFiltersContext } from "../Context";
import PublicSitesPicker from "@/ui/Pickers/PublicSites";
import { useTranslation } from "react-i18next";

const Sites = () => {
    const { t } = useTranslation();

    const {
        filters: { sites },
        setSites,
    } = useFiltersContext();

    return (
        <PublicSitesPicker
            label={t<string>("Public Sites")}
            sites={sites}
            onChange={setSites}
        />
    );
};

export default Sites;
