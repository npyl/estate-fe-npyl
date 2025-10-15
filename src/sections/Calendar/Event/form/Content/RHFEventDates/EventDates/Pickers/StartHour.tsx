import { FC } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import TimePicker, { TimePickerProps } from "@/components/Pickers/TimePicker";

interface StartHourPickerProps
    extends Omit<TimePickerProps, "label" | "fullWidth" | "defaultValue"> {}

const StartHourPicker: FC<StartHourPickerProps> = (props) => {
    const { t } = useTranslation();

    return (
        <TimePicker
            fullWidth
            label={t("From")}
            defaultValue={dayjs().toISOString()}
            {...props}
        />
    );
};

export default StartHourPicker;
