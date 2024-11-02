import CodeSelect from "@/sections/CodeSelect";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const PropertySelect = () => {
    const { t } = useTranslation();
    return (
        <CodeSelect
            renderInput={(props) => (
                <TextField label={t("Property")} {...props} />
            )}
        />
    );
};

export default PropertySelect;
