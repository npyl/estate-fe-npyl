import { FC } from "react";
import dayjs from "dayjs";
import RHFTimePicker, {
    RHFTimePickerProps,
} from "@/components/hook-form/RHFTimePicker";
import { useTranslation } from "react-i18next";

interface EndHourPickerProps
    extends Omit<
        RHFTimePickerProps,
        "name" | "label" | "fullWidth" | "defaultValue"
    > {
    name: string;
}

const EndHourPicker: FC<EndHourPickerProps> = ({ name, ...props }) => {
    const { t } = useTranslation();

    return (
        <RHFTimePicker
            fullWidth
            label={t("Until")}
            defaultValue={dayjs().startOf("hour").add(1, "hour").toISOString()}
            name={name}
            {...props}
        />
    );
};

export default EndHourPicker;
