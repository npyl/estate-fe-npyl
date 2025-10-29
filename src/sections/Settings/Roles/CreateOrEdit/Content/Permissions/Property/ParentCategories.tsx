import { useTranslation } from "react-i18next";
import RHFParentCategoryMultiplePicker from "@/ui/Pickers/RHF/ParentCategoryMultiple";
import { RHFCheckbox } from "@/components/hook-form";
import WithAll from "./WithAll";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const allName = "propertyPermissions.allParentCategories";

const Picker = WithAll(RHFParentCategoryMultiplePicker, allName);

const ParentCategories = () => {
    const { t } = useTranslation();
    return (
        <Grid container display="flex" alignItems="center">
            <Grid xs={1.5}>
                <Typography>{t("Parent Categories")}</Typography>
            </Grid>
            <Grid xs={10.5}>
                <RHFCheckbox label={t("All")} name={allName} />
                <Picker name="propertyPermissions.parentCategories" />
            </Grid>
        </Grid>
    );
};

export default ParentCategories;
