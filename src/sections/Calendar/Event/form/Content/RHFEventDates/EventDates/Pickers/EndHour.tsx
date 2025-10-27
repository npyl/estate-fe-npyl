import { FC } from "react";
import { useTranslation } from "react-i18next";
import TimePicker, { TimePickerProps } from "@/components/Pickers/TimePicker";

interface EndHourPickerProps
    extends Omit<TimePickerProps, "label" | "fullWidth" | "defaultValue"> {}

const EndHourPicker: FC<EndHourPickerProps> = (props) => {
    const { t } = useTranslation();
    return <TimePicker fullWidth label={t("Until")} {...props} />;
};

export default EndHourPicker;
