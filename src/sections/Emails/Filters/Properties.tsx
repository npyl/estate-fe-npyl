import CodeSelect from "@/sections/_Autocompletes/Code";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { useFiltersContext } from "@/sections/Emails/Filters/Context";
import { SxProps, Theme } from "@mui/material";

const Sx: SxProps<Theme> = {
    width: "100px",
};

const PropertyFilter = () => {
    const { t } = useTranslation();

    const { propertyIds, setPropertyIds } = useFiltersContext();

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
