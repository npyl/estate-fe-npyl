/**
 * integration with Calendar's DatePickers
 */

import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";
import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import dynamic from "next/dynamic";
import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";
const IsAuthenticatedIndicator = dynamic(
    () => import("@/sections/Google/WorkspaceIndicator")
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

interface WithCalendarProps {
    edit: boolean;
}

const WithCalendar: FC<WithCalendarProps> = ({ edit }) => {
    const { t } = useTranslation();

    const isOpen = useWatch({ name: "withCalendar" });

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
                        <Assignee edit={edit} />
                    </Stack>
                </IsAuthenticatedIndicator>
            ) : null}
        </Stack>
    );
};

export default WithCalendar;
