import { FC } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import TimePicker, { TimePickerProps } from "@/components/Pickers/TimePicker";

interface EndHourPickerProps
    extends Omit<TimePickerProps, "label" | "fullWidth" | "defaultValue"> {}

const EndHourPicker: FC<EndHourPickerProps> = (props) => {
    const { t } = useTranslation();

    return (
        <TimePicker
            fullWidth
            label={t("Until")}
            defaultValue={dayjs().add(1, "hour").toISOString()}
            {...props}
        />
    );
};

export default EndHourPicker;
