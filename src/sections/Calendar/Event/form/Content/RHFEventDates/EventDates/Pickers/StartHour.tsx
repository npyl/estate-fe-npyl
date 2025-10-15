import { FC } from "react";
import dayjs from "dayjs";
import RHFTimePicker, {
    RHFTimePickerProps,
} from "@/components/hook-form/RHFTimePicker";
import { useTranslation } from "react-i18next";

interface StartHourPickerProps
    extends Omit<
        RHFTimePickerProps,
        "name" | "label" | "fullWidth" | "defaultValue"
    > {
    name: string;
}

const StartHourPicker: FC<StartHourPickerProps> = ({ name, ...props }) => {
    const { t } = useTranslation();

    return (
        <RHFTimePicker
            fullWidth
            label={t("From")}
            defaultValue={dayjs().startOf("hour").toISOString()}
            name={name}
            {...props}
        />
    );
};

export default StartHourPicker;
