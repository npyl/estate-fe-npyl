import FormControl from "@mui/material/FormControl";
import { useFiltersContext } from "../Context";
import PublicSitesPicker from "@/ui/Pickers/PublicSites";
import { StyledInputLabel } from "@/components/Filters/styled";
import { useTranslation } from "react-i18next";

const Sites = () => {
    const { t } = useTranslation();

    const {
        filters: { sites },
        setSites,
    } = useFiltersContext();

    return (
        <FormControl sx={{ minWidth: "150px" }}>
            <StyledInputLabel>{t("Public Sites")}</StyledInputLabel>
            <PublicSitesPicker
                label={t<string>("Public Sites")}
                sites={sites}
                onChange={setSites}
            />
        </FormControl>
    );
};

export default Sites;
