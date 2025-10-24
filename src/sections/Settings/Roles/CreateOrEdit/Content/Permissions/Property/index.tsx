import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import States from "./States";
import ParentCategories from "./ParentCategories";
import Categories from "./Categories";
import Divider from "@mui/material/Divider";

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
            <Divider />
            <Stack spacing={2} pt={1}>
                <States />
                <ParentCategories />
                <Categories />
            </Stack>

            {/* <Users /> */}
        </Stack>
    );
};

export default Property;
