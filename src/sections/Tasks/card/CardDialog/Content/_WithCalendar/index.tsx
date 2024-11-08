/**
 * integration with Calendar's DatePickers
 */

import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import dynamic from "next/dynamic";
import IsAuthenticatedIndicator from "@/sections/Calendar/IsAuthenticatedIndicator";
import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material";
const Pickers = dynamic(() => import("./Pickers"));

const SwitchSx: SxProps<Theme> = {
    gap: 1,
    ml: 0,
    "& .MuiFormControlLabel-label": {
        color: "text.secondary",
    },
    alignSelf: "start",
};

const OAuthButtonSx: SxProps<Theme> = {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
};

const WithCalendar = () => {
    const { t } = useTranslation();

    const { watch } = useFormContext();

    const isOpen = watch("withCalendar");

    return (
        <Stack position="relative">
            <RHFIOSSwitch
                name="withCalendar"
                label={t("Connect with Calendar")}
                labelPlacement="start"
                sx={SwitchSx}
            />

            {isOpen ? (
                <IsAuthenticatedIndicator sx={OAuthButtonSx}>
                    <Pickers />
                </IsAuthenticatedIndicator>
            ) : null}
        </Stack>
    );
};

export default WithCalendar;
