import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "@/components/hook-form";
import WithAll from "./WithAll";
import RHFCategoryMultiplePicker from "@/ui/Pickers/RHF/CategoryMultiple";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
const Picker = WithAll(RHFCategoryMultiplePicker, "allCategories");

const Categories = () => {
    const { t } = useTranslation();
    return (
        <Grid container display="flex" alignItems="center">
            <Grid xs={1.5}>
                <Typography>{t("Categories")}</Typography>
            </Grid>
            <Grid xs={10.5}>
                <RHFCheckbox label={t("All")} name="allCategories" />
                <Picker
                    name="categories"
                    parentCategoriesName="parentCategories"
                />
            </Grid>
        </Grid>
    );
};

export default Categories;
