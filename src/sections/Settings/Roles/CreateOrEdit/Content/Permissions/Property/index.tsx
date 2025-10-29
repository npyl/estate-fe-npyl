import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import States from "./States";
import ParentCategories from "./ParentCategories";
import Categories from "./Categories";
import Divider from "@mui/material/Divider";
import { SxProps, Theme } from "@mui/material";

const SwitchSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row-reverse",
    gap: 1,
};

const Triplet = () => {
    const { t } = useTranslation();
    return (
        <Stack direction="row" spacing={5}>
            <RHFIOSSwitch
                name="propertyPermissions.view"
                label={t("View")}
                sx={SwitchSx}
            />
            <RHFIOSSwitch
                name="propertyPermissions.edit"
                label={t("Edit")}
                sx={SwitchSx}
            />
            <RHFIOSSwitch
                name="propertyPermissions.delete"
                label={t("Delete")}
                sx={SwitchSx}
            />
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
