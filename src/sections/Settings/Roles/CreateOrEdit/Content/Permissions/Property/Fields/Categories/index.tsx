import { useTranslation } from "react-i18next";
import WithAll from "../WithAll";
import RHFCategoryMultiplePicker from "@/ui/Pickers/RHF/CategoryMultiple";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import AllWithFillCheckbox from "./AllWithFillCheckbox";
import { allName } from "./constants";

const Picker = WithAll(RHFCategoryMultiplePicker, allName);

const Categories = () => {
    const { t } = useTranslation();
    return (
        <Grid container display="flex" alignItems="center">
            <Grid xs={3}>
                <Typography>{t("Categories")}</Typography>
            </Grid>
            <Grid xs={9}>
                <AllWithFillCheckbox />
                <Picker
                    name="propertyPermissions.categories"
                    parentCategoriesName="propertyPermissions.parentCategories"
                />
            </Grid>
        </Grid>
    );
};

export default Categories;
