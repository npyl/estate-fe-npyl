import CodeSelect from "@/sections/_Autocompletes/Code";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { SxProps, Theme } from "@mui/material";
import { useRouter } from "next/router";

const Sx: SxProps<Theme> = {
    width: "100px",
};

const PropertyFilter = () => {
    const { t } = useTranslation();

    const { filters, setPropertyIds } = useFiltersContext();
    const { propertyIds } = filters;

    // INFO: prevent picker on property view
    const router = useRouter();
    const { propertyId } = router.query;
    if (Boolean(propertyId)) return null;

    return (
        <CodeSelect
            sx={Sx}
            idValue={propertyIds?.at(0)}
            onChange={(_, id) => setPropertyIds([id])}
            renderInput={(params) => (
                <TextField label={t("Property")} {...params} />
            )}
        />
    );
};

export default PropertyFilter;
