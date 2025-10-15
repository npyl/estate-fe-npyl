import { useTranslation } from "react-i18next";
import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import { SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import GoogleCalendarIcon from "@/assets/GoogleCalendar";

const WITH_CALENDAR_SWITCH_TESTID = "with-calendar-switch-testid";

const Label = () => {
    const { t } = useTranslation();

    return (
        <Stack spacing={0.1} direction={"row"}>
            <Typography>{t("Connect with Google Calendar")}</Typography>
            <GoogleCalendarIcon sx={{ fontSize: 28 }} />
        </Stack>
    );
};

const SwitchSx: SxProps<Theme> = {
    gap: 1,
    ml: 0,
    "& .MuiFormControlLabel-label": {
        color: "text.secondary",
    },
    alignSelf: "start",
};

const WithCalendarSwitch = () => (
    <RHFIOSSwitch
        data-testid={WITH_CALENDAR_SWITCH_TESTID}
        name="withCalendar"
        label={<Label />}
        labelPlacement="end"
        sx={SwitchSx}
    />
);

export { WITH_CALENDAR_SWITCH_TESTID };
export default WithCalendarSwitch;
