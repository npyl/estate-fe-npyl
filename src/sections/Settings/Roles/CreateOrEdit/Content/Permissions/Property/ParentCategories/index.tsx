import { useTranslation } from "react-i18next";
import RHFParentCategoryMultiplePicker from "@/ui/Pickers/RHF/ParentCategoryMultiple";
import WithAll from "../WithAll";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { allName } from "./constants";
import AllCheckbox from "./AllCheckbox";

const Picker = WithAll(RHFParentCategoryMultiplePicker, allName);

const ParentCategories = () => {
    const { t } = useTranslation();
    return (
        <Grid container display="flex" alignItems="center">
            <Grid xs={3}>
                <Typography>{t("Parent Categories")}</Typography>
            </Grid>
            <Grid xs={9}>
                <AllCheckbox />
                <Picker name="propertyPermissions.parentCategories" />
            </Grid>
        </Grid>
    );
};

export default ParentCategories;
