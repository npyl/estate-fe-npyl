import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import RHFIOSSwitch from "@/components/hook-form/RHFIOSSwitch";
import { SxProps, Theme } from "@mui/material";
import { ICreateOrUpdateTaskReq } from "@/types/tasks";
import { useCallback } from "react";
import dayjs from "dayjs";
import { START_HOUR } from "@/constants/calendar";

const SwitchSx: SxProps<Theme> = {
    gap: 1,
    ml: 0,
    "& .MuiFormControlLabel-label": {
        color: "text.secondary",
    },
    alignSelf: "start",
};

const WithCalendarSwitch = () => {
    const { t } = useTranslation();

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
            name="withCalendar"
            label={t("Connect with Calendar")}
            labelPlacement="start"
            sx={SwitchSx}
            onChange={onChange}
        />
    );
};

export default WithCalendarSwitch;
