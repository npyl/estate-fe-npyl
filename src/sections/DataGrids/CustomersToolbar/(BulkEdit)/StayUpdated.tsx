import {
    ToggleButton,
    ToggleButtonGroup,
    ToggleButtonGroupProps,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const StayUpdated: FC<Omit<ToggleButtonGroupProps, "exclusive">> = (props) => {
    const { t } = useTranslation();
    return (
        <Stack>
            <InputLabel>{t("Stay Updated")}</InputLabel>
            <ToggleButtonGroup exclusive {...props}>
                <ToggleButton value="">{t("Not selected")}</ToggleButton>
                <ToggleButton value={false}>{t("No")}</ToggleButton>
                <ToggleButton value={true}>{t("Yes")}</ToggleButton>
            </ToggleButtonGroup>
        </Stack>
    );
};

export default StayUpdated;
