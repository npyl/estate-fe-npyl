import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "@/components/hook-form";
import WithAll from "./WithAll";
import RHFCategoryMultiplePicker from "@/ui/Pickers/RHF/CategoryMultiple";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const allName = "propertyPermissions.allCategories";

const Picker = WithAll(RHFCategoryMultiplePicker, allName);

const Categories = () => {
    const { t } = useTranslation();
    return (
        <Grid container display="flex" alignItems="center">
            <Grid xs={3}>
                <Typography>{t("Categories")}</Typography>
            </Grid>
            <Grid xs={9}>
                <RHFCheckbox label={t("All")} name={allName} />
                <Picker
                    name="propertyPermissions.categories"
                    parentCategoriesName="propertyPermissions.parentCategories"
                />
            </Grid>
        </Grid>
    );
};

export default Categories;
