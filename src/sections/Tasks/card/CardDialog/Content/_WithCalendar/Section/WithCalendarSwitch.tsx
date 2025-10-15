import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import { SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import { useCallback } from "react";
import dayjs from "dayjs";
import { START_HOUR } from "@/constants/calendar";
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

const WithCalendarSwitch = () => {
    const { setValue } = useFormContext<ICreateOrUpdateTaskReq>();

    const onChange = useCallback((b: boolean) => {
        // enabling
        if (b) {
            const due0 = dayjs()
                .hour(START_HOUR)
                .minute(0)
                .second(0)
                .toISOString();
            const due1 = dayjs()
                .hour(START_HOUR + 1)
                .minute(0)
                .second(0)
                .toISOString();

            setValue("due", [due0, due1], { shouldDirty: true });
        }
    }, []);

    return (
        <RHFIOSSwitch
            data-testid={WITH_CALENDAR_SWITCH_TESTID}
            name="withCalendar"
            label={<Label />}
            labelPlacement="end"
            sx={SwitchSx}
            onChange={onChange}
        />
    );
};

export { WITH_CALENDAR_SWITCH_TESTID };
export default WithCalendarSwitch;
