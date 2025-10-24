import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import RHFParentCategoryPicker from "./Pickers/RHFParentCategory";
import RHFCategoryPicker from "./Pickers/RHFCategory";

const Triplet = () => {
    const { t } = useTranslation();
    return (
        <Stack direction="row" spacing={5}>
            <RHFIOSSwitch name="view" label={t("View")} />
            <RHFIOSSwitch name="edit" label={t("Edit")} />
            <RHFIOSSwitch name="delete" label={t("Delete")} />
        </Stack>
    );
};

const Property = () => {
    const { t } = useTranslation();

    return (
        <Stack spacing={1}>
            <Typography variant="h6" color="text.secondary">
                {t("Property")}
            </Typography>
            <Triplet />
            <Stack direction="row" spacing={1} pt={1}>
                {/* <States /> */}
                <RHFParentCategoryPicker name="parentCategories" />
                <RHFCategoryPicker
                    name="categories"
                    parentCategoriesName="parentCategories"
                />
            </Stack>

            {/* <Users /> */}
        </Stack>
    );
};

export default Property;
