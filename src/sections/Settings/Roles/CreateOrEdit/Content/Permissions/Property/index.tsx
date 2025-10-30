import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import States from "./States";
import ParentCategories from "./ParentCategories";
import Categories from "./Categories";
import Divider from "@mui/material/Divider";
import RHFManagerMultipleAutocomplete from "@/ui/Autocompletes/RHFManagerMultiple";
import Triplet from "./Triplet";

const Property = () => {
    const { t } = useTranslation();

    return (
        <Stack spacing={1}>
            <Typography variant="h6" color="text.secondary">
                {t("Property")}
            </Typography>
            <Triplet />
            <Divider />
            <Stack spacing={2} pt={1}>
                <States />
                <ParentCategories />
                <Categories />
            </Stack>
            <RHFManagerMultipleAutocomplete
                name="users"
                label={t<string>("Managers")}
            />
        </Stack>
    );
};

export default Property;
