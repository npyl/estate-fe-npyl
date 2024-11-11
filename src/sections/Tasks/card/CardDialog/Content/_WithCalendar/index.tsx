/**
 * integration with Calendar's DatePickers
 */

import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material";
const IsAuthenticatedIndicator = dynamic(
    () => import("@/sections/Calendar/IsAuthenticatedIndicator")
);
const Assignee = dynamic(() => import("./Assignee"));
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
    top: -20,
};

const EventOptionsSx: SxProps<Theme> = {
    bgcolor: ({ palette: { mode } }) =>
        mode === "light" ? "neutral.200" : "neutral.800",
    borderRadius: "10px",
    mt: 2,
    py: 2,
    px: 1,
};

const WithCalendar = () => {
    const { t } = useTranslation();

    const { watch } = useFormContext();

    const isOpen = watch("withCalendar");

    return (
        <Stack position="relative" spacing={1}>
            <RHFIOSSwitch
                name="withCalendar"
                label={t("Connect with Calendar")}
                labelPlacement="start"
                sx={SwitchSx}
            />

            {isOpen ? (
                <IsAuthenticatedIndicator sx={OAuthButtonSx}>
                    <Stack spacing={1} sx={EventOptionsSx}>
                        <Pickers />
                        <Assignee />
                    </Stack>
                </IsAuthenticatedIndicator>
            ) : null}
        </Stack>
    );
};

export default WithCalendar;
