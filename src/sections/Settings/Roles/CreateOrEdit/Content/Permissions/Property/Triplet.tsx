import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
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
                label={t("View_Permission")}
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

export default Triplet;
