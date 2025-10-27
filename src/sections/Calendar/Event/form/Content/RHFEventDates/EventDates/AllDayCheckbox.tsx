import { getAllDayStartEnd } from "@/components/Calendar/util";
import { TODAY } from "@/components/BaseCalendar/constants";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import FormControlLabel, {
    FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

const StyledFormControlLabel = styled(FormControlLabel)({
    width: "fit-content",
});

const getDates = (
    startDate: string,
    b: boolean
): readonly [string, string] | undefined => {
    // INFO: priority:
    // - hook-form's value since the user most likely has chosen something;
    // - then a fallback (TODAY)
    const calculated = startDate || TODAY.toISOString();

    if (b) {
        return getAllDayStartEnd(calculated);
    } else {
        const start = new Date(calculated);
        const end = new Date(start.getTime() + 60 * 60 * 1000); // Add 1 hour
        return [calculated, end.toISOString()];
    }
};

interface AllDayCheckboxProps
    extends Omit<
        FormControlLabelProps,
        "label" | "control" | "checked" | "onChange"
    > {
    allDay: boolean;
    startDate: string;
    onStartDateChange: (d: string) => void;
    onEndDateChange: (d: string) => void;
}

const AllDayCheckbox: FC<AllDayCheckboxProps> = ({
    allDay,
    startDate,
    onStartDateChange,
    onEndDateChange,
    ...props
}) => {
    const { t } = useTranslation();

    const onAllDayChange = useCallback(
        (_: any, b: boolean) => {
            const res = getDates(startDate, b);
            if (!res) return;

            const [start, end] = res;
            onStartDateChange(start);
            onEndDateChange(end);
        },
        [startDate]
    );
    return (
        <StyledFormControlLabel
            label={t("All day")}
            control={<Checkbox />}
            checked={allDay}
            onChange={onAllDayChange}
            {...props}
        />
    );
};

export default AllDayCheckbox;
